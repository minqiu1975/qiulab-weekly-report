
const mammoth = require("mammoth");
const fs = require("fs");

const buf = fs.readFileSync("/mnt/agents/upload/附件2-仇旻教授团队科研工作周报2026.07.03-博士.docx");

mammoth.convertToHtml({buffer: buf}).then(result => {
    const html = result.value;
    // 查找包含 "王晨荷" 或 "江骏浪" 的段落
    const pMatches = html.match(/<p>.*?<\/p>/gi);
    if (pMatches) {
        console.log("=== 包含 王晨荷/江骏浪 的 <p> 标签 ===");
        pMatches.forEach((p, i) => {
            const text = p.replace(/<[^>]+>/g, "").trim();
            if (text.includes("王晨荷") || text.includes("江骏浪") || text.includes("Jonah")) {
                console.log("[" + i + "] HTML: " + p.substring(0, 200));
                console.log("     Text: " + text.substring(0, 100));
                console.log("");
            }
        });
    }

    // 也打印所有 <p> 的前20个看看结构
    console.log("\n=== 所有 <p> 标签 (前30个) ===");
    const allP = html.match(/<p>.*?<\/p>/gi);
    if (allP) {
        allP.slice(0, 30).forEach((p, i) => {
            const text = p.replace(/<[^>]+>/g, "").trim();
            console.log("[" + i + "] " + text.substring(0, 80));
        });
    }
});
