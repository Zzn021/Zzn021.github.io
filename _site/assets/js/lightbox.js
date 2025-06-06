function formatExposureTime(seconds) {
    if (seconds >= 1) {
        return `${seconds.toFixed(1)}s`;
    } else {
        const denominator = Math.round(1 / seconds);
        return `1/${denominator} sec`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay       = document.getElementById("lightbox-overlay");
    const overlayImage  = document.getElementById("lightbox-image");
    const overlayMeta   = document.getElementById("lightbox-meta");

    document.querySelectorAll(".lightbox-trigger").forEach(img => {
        img.addEventListener("click", () => {
            overlayImage.src = img.src;
            overlay.classList.remove("hidden");

            // Fetch EXIF data
            overlayMeta.textContent = "Loading EXIF…";
            fetch(img.src)
                .then(r => r.blob())
                .then(blob => {
                    EXIF.getData(blob, function () {
                        const make      = EXIF.getTag(this, "Make")  || "Unknown";
                        const model     = EXIF.getTag(this, "Model") || "";
                        const iso       = EXIF.getTag(this, "ISOSpeedRatings") || "—";
                        const fstop     = EXIF.getTag(this, "FNumber") || "—";
                        const exposure  = EXIF.getTag(this, "ExposureTime") || "—";
                        const expStr    = exposure ? formatExposureTime(exposure) : "—";

                        overlayMeta.innerHTML = `
                            <strong>${make} ${model}</strong><br>
                            ISO: ${iso} | f/${fstop} | ${expStr}<br>
                            Zeneng Zhao
                        `;
                    });
                });
        });
    });

    // Clicking the backdrop closes the overlay
    document.querySelector(".lightbox-backdrop").addEventListener("click", () => {
        overlay.classList.add("hidden");
        overlayImage.src = "";
        overlayMeta.textContent = "";
    });
});