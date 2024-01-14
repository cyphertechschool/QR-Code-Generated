const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById("url").value;
    const size = document.getElementById("size").value;

    if (url === "") {
        alert("Please enter somthing");
    } else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();

            generateQrCode(url, size);

            setTimeout(() => {
                const downloadUrl = qr.querySelector("img").src;
                createDownloadBtn(downloadUrl);
            }, 50);
        }, 1000);
    }
};

const generateQrCode = (url, size) => {
    const qrcode = new QRCode("qrcode", {
        text: url,
        width: size,
        height: size,
    });
};

const showSpinner = () => {
    document.getElementById("spinner").style.display = "block";
};
const hideSpinner = () => {
    document.getElementById("spinner").style.display = "none";
};

const clearUI = () => {
    qr.innerHTML = "";
    const downloadbtn = document.getElementById('download-link');
    if (downloadbtn) {
        downloadbtn.remove();
    }
};


const createDownloadBtn = (downloadUrl) => {
    const link = document.createElement("a");
    link.id = "download-link";
    link.classList.add("downloadbtn");
    link.href = downloadUrl;
    link.download = `file-qr-code-${new Date().toLocaleString('en-IN', { timeZone: 'UTC' })}`;
    link.innerHTML = 'Download <i class="fa-solid fa-file-arrow-down"></i>';
    document.getElementById("generated").appendChild(link);
};

hideSpinner();
form.addEventListener("submit", onGenerateSubmit);;
