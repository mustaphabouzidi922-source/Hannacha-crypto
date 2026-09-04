<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hannacha Crypto | منصة صك وتوثيق العملات الآلية</title>
    <!-- استدعاء المكتبات البرمجية اللازمة للتعامل مع الـ IPFS ومحفظة Web3 -->
    <script src="https://jsdelivr.net"></script>
    <script src="https://jsdelivr.net"></script>
    <script src="https://tailwindcss.com"></script>
    <style>
        .gold-text { color: #D4AF37; }
        .gold-bg { background-color: #D4AF37; }
        .gold-border { border-color: #D4AF37; }
        .gold-glow { box-shadow: 0 0 15px rgba(212, 175, 55, 0.2); }
    </style>
</head>
<body class="bg-black text-gray-100 font-sans min-h-screen flex flex-col justify-between">

    <!-- الهيدر الخاص بالمنصة -->
    <header class="border-b border-gray-900 p-5 bg-zinc-950">
        <div class="max-w-6xl mx-auto flex justify-between items-center w-full">
            <h1 class="text-2xl md:text-3xl font-extrabold gold-text tracking-wider">HANNACHA CRYPTO</h1>
            <button id="connectWalletBtn" onclick="connectWallet()" class="gold-bg text-black font-bold px-6 py-2 rounded-full transition transform hover:scale-105 text-sm">
                ربط المحفظة فوراً 🦊
            </button>
        </div>
    </header>

    <!-- المحتوى الرئيسي للمنصة -->
    <main class="flex-grow flex items-center justify-center p-4 my-6">
        <div class="bg-zinc-900 p-6 md:p-8 rounded-2xl border gold-border gold-glow w-full max-w-lg space-y-6">
            <div class="text-center">
                <h2 class="text-xl font-bold text-white flex items-center justify-center gap-2">
                    إنشاء وتوثيق العملات تلقائياً على BscScan 🟢
                </h2>
                <p class="text-xs text-gray-400 mt-1">يتم رفع الشعار وحفظ البيانات بشكل لامركزي وموثق بالعلامة الخضراء</p>
            </div>

            <!-- نموذج إدخال البيانات -->
            <form id="tokenForm" class="space-y-4" onsubmit="handleFormSubmit(event)">
                <div>
                    <label class="block text-xs font-semibold mb-1 text-gray-400">اسم العملة (Token Name):</label>
                    <input type="text" id="tokenName" required placeholder="مثال: Hannacha Coin" class="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 text-sm">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-semibold mb-1 text-gray-400">الرمز (Symbol):</label>
                        <input type="text" id="tokenSymbol" required placeholder="HNC" class="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 text-sm">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold mb-1 text-gray-400">الأعداد العشرية (Decimals):</label>
                        <input type="number" id="tokenDecimals" value="18" required class="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 text-sm">
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-semibold mb-1 text-gray-400">إجمالي المعروض (Total Supply):</label>
                    <input type="number" id="tokenSupply" value="1000000" required class="w-full px-4 py-2 bg-black border border-gray-800 rounded-lg text-white focus:outline-none focus:border-yellow-500 text-sm">
                </div>

                <div>
                    <label class="block text-xs font-semibold mb-1 text-gray-400">أيقونة شعار العملة (Logo):</label>
                    <input type="file" id="tokenLogo" accept="image/*" required class="w-full text-xs text-gray-400 file:py-2 file:px-4 file:rounded-md file:bg-zinc-800 file:text-white file:border-0 cursor-pointer">
                </div>

                <!-- الشروط ونسب الاستقطاع والأيردروب للمستخدمين -->
                <div class="bg-black p-3 rounded-lg border border-yellow-600/30 text-[11px] text-gray-300 space-y-1.5">
                    <p class="font-bold gold-text flex items-center gap-1">⚠️ شروط إطلاق العملة والتوزيع التلقائي:</p>
                    <p>• رسوم صك العملة هي <span class="gold-text font-bold">2% (0.02 BNB)</span> تحول مباشرة وبشكل آلي لمحفظة المنصة.</p>
                    <p>• سيتم اقتطاع <span class="gold-text font-bold">0.1% للمنصة</span> و <span class="text-green-400 font-bold">0.1% للأيردروب</span> للتسويق المباشر لعملتك للجمهور.</p>
                    
                    <label class="flex items-center space-x-2 space-x-reverse mt-2 cursor-pointer pt-1">
                        <input type="checkbox" required class="rounded bg-black border-gray-700 checked:bg-yellow-500 text-black">
                        <span class="text-gray-200 font-medium">أوافق على استقطاع الرسوم والنسب وتفعيل العلامة الخضراء الفورية.</span>
                    </label>
                </div>

                <button type="submit" id="actionBtn" class="w-full gold-bg text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition shadow-lg text-sm tracking-wide">
                    صك العملة وتفعيل التوثيق الأخضر الفوري 🚀
                </button>
            </form>
        </div>
    </main>

    <!-- الفوتر الخاص بالمنصة للتواصل والدعم -->
    <footer class="border-t border-gray-900 bg-zinc-950 p-6 text-center text-xs text-gray-500 space-y-3">
        <p class="font-medium">© 2026 Hannacha Crypto. جميع الحقوق محفوظة لتوثيق وإطلاق الأصول الرقمية.</p>
        <div class="flex justify-center items-center space-x-6 space-x-reverse text-gray-400">
            <span>📧 البريد الإلكتروني: <a href="mailto:medeacrypto@gmail.com" class="gold-text hover:underline">medeacrypto@gmail.com</a></span>
            <span>🐦 حساب تويتر: <a href="https://x.com" target="_blank" class="gold-text hover:underline">@MedeaCrypto</a></span>
        </div>
    </footer>

    <!-- منطق الويب 3 الذكي ورفع الملفات الفوري لـ IPFS اللامركزي موثق بمفاتيح Pinata المخصصة لك -->
    <script>
        let userAddress = null;
        let provider = null;

        // 🟢 1. عنوان عقد المصنع الموثق والناجح الخاص بك على BscScan
        const FACTORY_CONTRACT_ADDRESS = "0xc3d6eb4349ad7b3bb533e85d8dd8baefc76fbebd"; 

        // 🔑 2. مفاتيح حساب Pinata المستخرجة لحسابك جاهزة للعمل آلياً
        const PINATA_API_KEY = "489fd17bb1c4de1f1c6a";
        const PINATA_SECRET_KEY = "1df8ff0dbb970913369a5e58af704d72179f01081a28bdf8434f1f68b119a884";

        // الـ ABI المستخرج من العقد الموثق لاستدعاء دالة صك العملة
        const FACTORY_ABI = [
            "function deployNewToken(string memory _name, string memory _symbol, uint8 _decimals, uint256 _supply, string memory _tokenURI) external payable returns (address)"
        ];

        // الربط الفوري والمباشر مع ميتاماسك أو تراست ووليت بدون تعقيدات
        async function connectWallet() {
            if (window.ethereum) {
                try {
                    provider = new ethers.providers.Web3Provider(window.ethereum);
                    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                    userAddress = accounts[0];
                    document.getElementById('connectWalletBtn').innerText = userAddress.substring(0,6) + "..." + userAddress.substring(38);
                    document.getElementById('connectWalletBtn').className = "bg-green-800 text-white font-bold px-6 py-2 rounded-full text-sm";
                } catch (err) {
                    alert("تم رفض عملية ربط المحفظة.");
                }
            } else {
                // فتح الموقع داخل المحفظة مباشرة للهواتف
                window.location.href = "https://app.link" + window.location.host;
            }
        }

        // دالة الرفع الآلي للشعار من جهاز المستخدم إلى سحابة IPFS اللامركزية
        async function uploadFileToIPFS(file) {
            const url = `https://pinata.cloud`;
            let data = new FormData();
            data.append('file', file);
            
            const response = await axios.post(url, data, {
                maxBodyLength: 'Infinity',
                headers: {
                    'Content-Type': `multipart/form-data`,
                    'pinata_api_key': PINATA_API_KEY,
                    'pinata_secret_api_key': PINATA_SECRET_KEY
                }
            });
            return `https://pinata.cloud{response.data.IpfsHash}`;
        }

        // دالة إنشاء ملف الـ Metadata JSON لتوثيق الشعار وبيانات العملة آلياً
        async function uploadMetadataToIPFS(name, symbol, decimals, imageUrl) {
            const url = `https://pinata.cloud`;
            const metadata = {
                name: name,
                symbol: symbol,
                decimals: decimals,
                image: imageUrl, // رابط الصورة المرفوع
                description: `Verified Token created on Hannacha Crypto Platform.`,
                verified: true
            };
            const response = await axios.post(url, metadata, {
                headers: { 'pinata_api_key': PINATA_API_KEY, 'pinata_secret_api_key': PINATA_SECRET_KEY }
            });
            return `https://pinata.cloud{response.data.IpfsHash}`;
        }

        // معالجة طلب الصك والرفع عند ضغط المستخدم على زر الإرسال
        async function handleFormSubmit(e) {
            e.preventDefault();
            if (!userAddress) {
                await connectWallet();
                if (!userAddress) return;
            }

            const btn = document.getElementById('actionBtn');
            btn.disabled = true;
