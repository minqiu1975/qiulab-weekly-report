
const mammoth = require("mammoth");
const fs = require("fs");

const buf = fs.readFileSync("/mnt/agents/upload/附件2-仇旻教授团队科研工作周报2026.07.03-博士.docx");

mammoth.convertToHtml({buffer: buf}).then(result => {
    const html = result.value;
    const liMatches = html.match(/<li>.*?<\/li>/gi);
    if (liMatches) {
        console.log("=== 所有 <li> 标签 (前50个) ===");
        liMatches.slice(0, 50).forEach((li, i) => {
            const text = li.replace(/<[^>]+>/g, "").trim();
            console.log(`[${i}] ${text.substring(0, 80)}`);
        });
    } else {
        console.log("没有 <li> 标签");
        console.log("=== HTML 前3000字符 ===");
        console.log(html.substring(0, 3000));
    }
});
