const researchFiles = {
  four: "第二轮_首批四个AI工具能力研究_V1.3.md",
  ab: "第二轮_AI工具核心能力研究_A-B类_V1.5.md",
  ce: "第二轮_AI工具核心能力研究_C-E类_V1.4.md",
  verification: "第二轮收口_关键核验与修改记录_V1.1.md",
};

const categories = [
  {
    id: "A", label: "RESEARCH", title: "综合AI助手与知识研究", color: "#F3EADB",
    description: "读资料、开展研究，生成可以继续修改的知识成果。",
    intro: "从上传资料或提出一个问题开始。助手可以比较不同材料、搜索补充证据，再把研究做成可以回查的报告、图表或文件。",
  },
  {
    id: "B", label: "AGENTS", title: "任务执行与软件开发Agent", color: "#E5EEE7",
    description: "处理真实文件、执行任务，修改并验证软件项目。",
    intro: "在授权环境中操作办公文件或代码。阅读成果时，可以看它实际改了什么、在哪里运行、留下了哪些检查记录。",
  },
  {
    id: "C", label: "VISUAL", title: "图像生成、编辑与视觉创作", color: "#F7E5DC",
    description: "生成图像与设计稿，继续修改文字、图层和排版。",
    intro: "从创意或已有画面出发，生成视觉素材，并在设计画布上改字、移动对象和重新排版。能改到哪一步，取决于稿件保留的结构。",
  },
  {
    id: "D", label: "VIDEO", title: "视频生成与编辑", color: "#EBE7F0",
    description: "从剧本和镜头出发，生成、修改并组织视频。",
    intro: "从文字、参考画面或已有镜头开始。可以改一个画面、重做一个镜头，也可以在时间线上组织多个片段和声音。",
  },
  {
    id: "E", label: "AUDIO", title: "语音、音频与音乐生成及交互", color: "#F5EDCD",
    description: "制作配音、转写录音、创作音乐与语音交互。",
    intro: "给它文字、录音或歌词，得到配音、字幕、歌曲等不同成果。涉及实时对话时，还需看能否接续发言和调用已配置的工具。",
  },
  {
    id: "F", label: "WORLDS", title: "空间、世界建模与可交互环境", color: "#DFECEA",
    description: "观察人的动作如何改变持续生成的世界。",
    intro: "按键、转动视角或输入新要求，都会影响接下来生成的场景。这一章记录 Genie 4 面向可信测试者的受限研究预览。",
  },
];

const products = [
  { id: "01", categoryId: "A", name: "ChatGPT", company: "OpenAI", file: researchFiles.four, videoIds: ["01-work", "01-voice"] },
  { id: "02", categoryId: "A", name: "Claude", company: "Anthropic", file: researchFiles.ab, videoIds: ["02-recap", "02-data"] },
  { id: "03", categoryId: "A", name: "Gemini应用", company: "Google", file: researchFiles.ab, videoIds: ["03-intro", "03-files"] },
  { id: "04", categoryId: "A", name: "Kimi", company: "月之暗面", file: researchFiles.ab, videoIds: ["04-3d"] },
  { id: "05", categoryId: "B", name: "腾讯WorkBuddy", company: "腾讯", file: researchFiles.four, videoIds: ["05-intro"] },
  { id: "06", categoryId: "B", name: "Codex", company: "OpenAI", file: researchFiles.ab, videoIds: ["06-cloud"] },
  { id: "07", categoryId: "B", name: "Claude Code", company: "Anthropic", file: researchFiles.ab, videoIds: ["07-intro"] },
  { id: "08", categoryId: "C", name: "Canva AI", company: "Canva", file: researchFiles.ce, videoIds: ["08-intro"] },
  { id: "09", categoryId: "D", name: "Runway", company: "Runway", file: researchFiles.ce, videoIds: ["09-main", "09-backup"] },
  { id: "10", categoryId: "D", name: "即梦AI", company: "字节跳动", file: researchFiles.ce, videoIds: ["10-drama"] },
  { id: "11", categoryId: "E", name: "ElevenLabs音频产品线", company: "ElevenLabs", file: researchFiles.ce, videoIds: ["11-studio", "11-dub"] },
  { id: "12", categoryId: "E", name: "Suno", company: "Suno", file: researchFiles.ce, videoIds: ["12-v6"] },
  { id: "13", categoryId: "E", name: "MiniMax语音", company: "MiniMax", file: researchFiles.ce, videoIds: ["13-tutorial"] },
  { id: "14", categoryId: "F", name: "Genie 4", company: "Google DeepMind", file: researchFiles.four, videoIds: ["14-demo"], isFrontier: true },
].map(({ file, ...product }) => ({
  isFrontier: false,
  ...product,
  researchRef: { file, anchor: "obj-" + product.id },
}));

const researchDates = { base: "2026-11-16", review: "2026-11-17" };
