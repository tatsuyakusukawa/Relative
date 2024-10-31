document.addEventListener("DOMContentLoaded", function() {
    const pathDisplay = document.getElementById("relative-path-display");

    window.allowDrop = function(event) {
        event.preventDefault();
    };

    window.drag = function(event) {
        if (event.target.id === "sampleImage") { // Drag only sampleImage
            event.dataTransfer.setData("text", event.target.id);
        }
    };

    window.drop = function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        const draggedItem = document.getElementById(data);
        
        if (draggedItem && (event.target.classList.contains("folder") || event.target.classList.contains("directory"))) {
            event.target.querySelector('.directory')?.appendChild(draggedItem) || event.target.appendChild(draggedItem);
        } else if (draggedItem && (event.target.id === "directory-tree" || event.target.classList.contains("file"))) {
            event.target.parentNode.insertBefore(draggedItem, event.target.nextSibling);
        }

        updateRelativePath();
    };

    function updateRelativePath() {
        const sampleImage = document.getElementById("sampleImage");
        if (sampleImage) {
            const path = getRelativePath(sampleImage);
            pathDisplay.textContent = `index.htmlのimgタグに入れるべき相対パス: <img src="${path}" alt="">
            `;
        }
    }

    function getRelativePath(item) {
        let path = item.textContent.trim();
        let parent = item.parentElement;

        let pathParts = [];

        // Traverse up until we reach the root directory
        while (parent && !parent.id.includes("directory-tree")) {
            if (parent.classList.contains("folder") || parent.classList.contains("directory")) {
                let folderName = parent.firstChild.textContent.trim().replace("/", "");
                if (folderName && folderName !== "PJ_file") {
                    pathParts.unshift(folderName);
                }
            }
            parent = parent.parentElement;
        }

        pathParts.push(path);

        return pathParts.join("/");
    }

    updateRelativePath(); // 初期の相対パスを表示

});
