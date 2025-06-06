document.addEventListener('DOMContentLoaded', function() {
    const contentBlocks = document.querySelectorAll('.intro, .section-title, .part, .part-content, .part-sub-content');

    setInterval(() => {
        const scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        const wh = window.innerHeight;

        contentBlocks.forEach((block) => {
            if (block.classList.contains('appear')) return;

            const pos = block.getBoundingClientRect().top + window.scrollY;
            if (scrollPos + wh * 0.9 >= pos) {
                block.classList.add('appear');
            }
        });
    }, 200);
});
