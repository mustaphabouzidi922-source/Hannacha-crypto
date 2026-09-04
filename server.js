require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// إعداد "Multer" لاستقبال الصورة المؤقتة المخزنة من متصفح المستخدم
const upload = multer({ dest: 'uploads/' });

// 🔑 ضع مفاتيح Pinata الخاصة بك هنا (أو في ملف .env)
const PINATA_API_KEY = process.env.PINATA_API_KEY || "ضع_هنا_YOUR_PINATA_API_KEY";
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || "ضع_هنا_YOUR_PINATA_SECRET_KEY";

/**
 * 1. دالة رفع الصورة إلى IPFS
 */
async function uploadImageToIPFS(filePath) {
    const url = `https://pinata.cloud`;
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const response = await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY
        }
    });
    
    // إرجاع رابط الصورة العام عبر بوابة IPFS (ليقرأه العقد والمحافظ بوضوح)
    return `https://pinata.cloud{response.data.IpfsHash}`;
}

/**
 * 2. دالة رفع ملف البيانات الوصفية (Metadata JSON) إلى IPFS
 */
async function uploadMetadataToIPFS(tokenName, tokenSymbol, imageUrl) {
    const url = `https://pinata.cloud`;
    
    // الهيكل القياسي للميتا-داتا الذي تقرأه منصة Flap والمحافظ الرقمية
    const metadata = {
        name: tokenName,
        symbol: tokenSymbol,
        image: imageUrl, // رابط الصورة الذي رفعناه في الخطوة الأولى
        description: `Official token for ${tokenName}, created on our custom platform.`,
        created_by: "OurPlatform"
    };

    const response = await axios.post(url, metadata, {
        headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY
        }
    });

    // إرجاع الرابط النهائي للملف
    return `https://pinata.cloud{response.data.IpfsHash}`;
}

/**
 * 3. رابط API الخاص بمنصتك لاستقبال طلب إنشاء العملة
 */
app.post('/api/create-token-metadata', upload.single('logo'), async (req, res) => {
    try {
        const { tokenName, tokenSymbol } = req.body;
        const file = req.file;

        if (!tokenName || !tokenSymbol || !file) {
            return res.status(400).json({ success: false, error: 'برجاء إرسال اسم العملة، الرمز، وشعار الصورة.' });
        }

        console.log(`جاري معالجة عملة جديدة: ${tokenName}...`);

        // الخطوة أ: رفع الصورة
        const imageUrl = await uploadImageToIPFS(file.path);
        console.log(`✅ تم رفع الصورة بنجاح: ${imageUrl}`);

        // الخطوة ب: إنشاء ورفع ملف الميتا-داتا JSON
        const metadataUrl = await uploadMetadataToIPFS(tokenName, tokenSymbol, imageUrl);
        console.log(`✅ تم إنشاء ملف الـ JSON بنجاح: ${metadataUrl}`);

        // تنظيف وحذف ملف الصورة المؤقت من السيرفر المحلي بعد الرفع
        fs.unlinkSync(file.path);

        // إرسال الرابط النهائي لواجهة منصتك الأمامية (Frontend) لاستدعاء محفظة المستخدم
        return res.json({
            success: true,
            message: "تم تجهيز روابط الشعار والميتا-داتا بنجاح آلياً!",
            imageUrl: imageUrl,
            metadataUrl: metadataUrl // هذا الرابط هو ما تمرره كـ URI في عقدك الذكي
        });

    } catch (error) {
        console.error("خطأ في عملية الرفع الآلي:", error.message);
        if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path); // حذف الملف إذا فشل الطلب
        return res.status(500).json({ success: false, error: error.message });
    }
});

// تشغيل السيرفر على المنفذ 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`سيرفر رفع الشعارات يعمل الآن على الرابط: http://localhost:${PORT}`);
});
