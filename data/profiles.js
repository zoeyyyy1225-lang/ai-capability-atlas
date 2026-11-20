// 能力正文依据目录对应的六问档案，案例与条件分别保留来源编号。
const profiles = {
  "01": {
    summary: "综合助手，可读资料、查证据和算数据，并在 Work 中把分析做成可修改的办公文件。",
    canDo: [
      "在 Chat 中比较上传的报告、表格与截图，解释口径和分歧。",
      "用深度研究拟定计划，查找网页及已授权资料。",
      "在数据分析工具中清洗、关联和汇总 Excel 或 CSV。",
      "在 Work 中按要求制作并修订文稿、表格和演示。",
    ],
    deliverables: [
      "带引用、可回查来源的研究报告。",
      "带计算说明的汇总表和图表。",
      "可继续修改的 Word 文档、PPT 或表格文件。",
    ],
    example: {
      title: "算出金级套餐客户的购买总额",
      input: "含客户 ID 的客户表与购买记录。",
      steps: ["按客户 ID 关联两表", "筛选金级套餐客户", "汇总购买额"],
      output: "按套餐筛选的汇总表及对计算结果的解释。",
      evidenceType: "官方教程",
      ref: "C06",
      source: {
        title: "OpenAI 官方教程 · 用 ChatGPT 分析表格数据",
        url: "https://help.openai.com/en/articles/9213685-extracting-insights-with-chatgpt-data-analysis",
      },
    },
    conditions: [
      { text: "Chat、Work 和数据分析工具各有入口，受账号、工作区、地区及授权约束。", refs: "C01、C03、C05、C15" },
      { text: "深度研究可只查指定网站，或优先这些网站并保留全网搜索。", refs: "C21、核验记录 §一" },
    ],
  },
  "02": {
    summary: "综合助手，可调查资料，并与用户在同一份文档、表格或演示里反复修改。",
    canDo: [
      "在 Research 中多步查找网页和已连接应用的资料。",
      "在 Docs 中起草、改写项目文稿并处理批注。",
      "在 Sheets 建带公式的表格，在 Slides 制作演示。",
    ],
    deliverables: [
      "汇总多个来源的研究报告。",
      "可共同编辑、批注和导出的 Docs 文档。",
      "含公式的轻量表格或可继续编辑的演示稿。",
    ],
    example: {
      title: "用项目笔记起草本周进展报告",
      input: "项目笔记和上周的数字。",
      steps: ["在 Docs 起草本周报告", "共同批注需要补充的段落", "按意见修订文档"],
      output: "可继续编辑、批注和分享的项目进展文档。",
      evidenceType: "官方教程",
      ref: "CL09",
      source: {
        title: "Anthropic 官方教程 · 使用 Claude Docs",
        url: "https://support.claude.com/en/articles/16923645-get-started-with-claude-docs",
      },
    },
    conditions: [
      { text: "Research 属付费功能。移动端只查网页，使用连接资料需在相应入口授权。", refs: "CL04" },
      { text: "Docs 中的图表要明确要求刷新，才会反映来源数据的变化。", refs: "CL09" },
      { text: "Sheets 为付费 beta，适合轻量表格。透视表、宏等 Excel 功能暂缺。", refs: "CL05" },
    ],
  },
  "03": {
    summary: "连接 Google 资料的综合助手，可先规划再研究，也能把报告做成可编辑演示或互动内容。",
    canDo: [
      "在 Deep Research 选择来源、调整计划并开展调查。",
      "在 Canvas 编辑文稿，或把材料转成演示、测验和小应用。",
      "在手机端用 Live 共享摄像画面或屏幕并开展语音讨论。",
    ],
    deliverables: [
      "有引用、可导出的研究报告。",
      "可编辑的演示、测验或带预览的小应用。",
    ],
    example: {
      title: "把一项公开资料调查做成演示",
      input: "研究主题、公开网页及已授权的 Gmail 或 Drive 资料。",
      steps: ["选择来源并调整研究计划", "启动调查并核对引用", "在 Canvas 把报告转为演示"],
      output: "带引用的报告与可继续修改的演示稿。",
      evidenceType: "研究概括",
      ref: "GM04、GM05",
      source: {
        title: "Google 官方指南 · 使用 Gemini Deep Research",
        url: "https://support.google.com/gemini/answer/15719111?hl=en",
      },
    },
    conditions: [
      { text: "Gmail、Drive 须连接授权，研究时可取消 Google Search 来源。", refs: "GM04、GM07" },
      { text: "Live 主要在移动端使用。可连接服务受账号类型和设置影响。", refs: "GM06、GM07" },
      { text: "生成视频与 Tasks 后台任务各有年龄、套餐、地区和设备条件。", refs: "GM03、GM09" },
    ],
  },
  "04": {
    summary: "可读资料并开展深度研究，也可通过专门入口交付办公文件、网站或可交互的三维作品。",
    canDo: [
      "用 Deep Research 撰写报告，点击正文里的引用回查资料。",
      "在 Docs、Sheets 和 PPT 中制作或修订办公文件。",
      "在 Build 制作网站，在 3D Make 用文字、草图或参考图制作三维成果。",
    ],
    deliverables: [
      "可回查来源的研究报告。",
      "可编辑的 PPT 或带公式的表格。",
      "可预览的网站、交互式 3D 网页或模型文件。",
    ],
    example: {
      title: "把设计草图做成所需的三维成果",
      input: "文字描述、设计草图和期望的成品类型。",
      steps: ["选 3D 网页、建模或打印类型", "旋转查看预览", "提出修改并保存对应成果"],
      output: "所选类型的交互网页、可查看的三维模型或打印准备文件。",
      evidenceType: "官方教程",
      ref: "KI07、KI08",
      source: {
        title: "Kimi 官方指南 · 3D Make",
        url: "https://www.kimi.com/en/help/3d-make/3d-make-overview",
      },
    },
    conditions: [
      { text: "研究、办公、Build 和 3D Make 各有入口、产物及额度。可编辑 PPT 走专门的 PPT 入口。", refs: "KI03、KI04、KI05、KI06、KI07、KI09" },
      { text: "3D 网页、建模与打印各有交付格式。打印前仍须检查尺寸、壁厚并切片。", refs: "KI07、KI08" },
      { text: "网站预览后须主动发布。网站登录、数据存储等功能需要按实际项目验证。", refs: "KI06" },
    ],
  },
  "05": {
    summary: "办公任务 Agent，可在授权目录整理和批量修改真实文件，并把材料做成报告、表格或演示。",
    canDo: [
      "识别文件内容，按日期、主题等规则整理目录和批量改名。",
      "按月份或产品线汇总 Excel、CSV，制作业务图表。",
      "从已有材料生成或修改 Word 文稿和 PPT。",
    ],
    deliverables: [
      "新旧文件名对照预览，以及执行后实际改名的文件。",
      "可继续修改的 Word、PPT，以及业务图表或报告。",
    ],
    example: {
      title: "按统一规则批量改文件名",
      input: "指定文件夹，以及按日期、主题、类型命名的规则。",
      steps: ["识别目录内的文件", "列出新旧文件名并核对", "确认后在原目录改名"],
      output: "已在磁盘上改名的文件，可逐项与预览比对。",
      evidenceType: "官方教程",
      ref: "W09",
      source: {
        title: "腾讯 WorkBuddy 官方教程 · 文件内容识别与处理",
        url: "https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Practice-Cases/Practice-One",
      },
    },
    conditions: [
      { text: "修改本地文件须获得指定目录的读写权限。", refs: "W08、W09" },
      { text: "通过消息助理远程处理本地文件时，受控电脑要开机、联网并运行客户端。", refs: "W06、核验记录 §一" },
      { text: "云端任务可在本机离线时执行，读写范围限于云环境能访问的资源。", refs: "W07、核验记录 §一" },
    ],
  },
  "06": {
    summary: "软件开发 Agent，可理解和修改代码库、运行测试并审阅改动，交付可检查的代码差异。",
    canDo: [
      "读懂项目结构与相关代码，定位需要修改的文件。",
      "按需求修正缺陷、补测试并运行构建或检查。",
      "审阅代码差异，或在独立工作副本中并行推进修改。",
    ],
    deliverables: [
      "实际修改的代码文件、补丁或可审阅的差异。",
      "命令和测试记录、验证说明及评审发现。",
    ],
    example: {
      title: "修复刷新后丢失保存结果的问题",
      input: "保存后刷新便丢失的复现步骤，以及保持 API 不变的要求。",
      steps: ["按步骤复现并定位问题", "保持 API 不变并修复", "运行相关测试"],
      output: "修复后的代码差异、相关测试结果和验证说明。",
      evidenceType: "官方教程",
      ref: "CX04",
      source: {
        title: "OpenAI 官方指南 · Codex 提示词示例",
        url: "https://learn.chatgpt.com/docs/prompting#prompting-codex",
      },
    },
    conditions: [
      { text: "本地和 Remote 依赖执行电脑与开发环境。Cloud 使用独立的托管工作区。", refs: "CX01、CX06" },
      { text: "仓库、依赖、网络及写入权限须在实际执行环境中具备。工作副本需要 Git 项目。", refs: "CX05、CX06、CX09" },
      { text: "测试结果只覆盖已经运行的检查。合并改动前仍需复核业务行为。", refs: "CX04、CX08" },
    ],
  },
  "07": {
    summary: "软件开发 Agent，可读改项目、运行命令与测试，并通过专门 Agent 和脚本组织复杂任务。",
    canDo: [
      "读懂代码库，定位相关文件，再按要求修改、重构或补测试。",
      "在执行环境中运行构建和测试，检查改动结果。",
      "委派专门 Agent 搜索或审阅代码，用动态编排组织多步任务。",
    ],
    deliverables: [
      "实际修改的项目文件与可审阅的代码差异。",
      "命令和测试结果，以及可保存、检查、重跑的编排脚本。",
    ],
    example: {
      title: "重构旧工具代码，保留原有行为",
      input: "现有 utils.js、使用 ES2024 能力的要求和行为约束。",
      steps: ["读代码与现有测试", "按约束重构", "运行项目相关测试"],
      output: "修改后的文件、变更说明与已运行的检查结果。",
      evidenceType: "官方教程",
      ref: "CC03",
      source: {
        title: "Anthropic 官方指南 · Claude Code 常见工作流程",
        url: "https://code.claude.com/docs/en/common-workflows",
      },
    },
    conditions: [
      { text: "使用独立的 Claude Code 入口，准备仓库、依赖及执行与写入权限。测试只覆盖已检查的行为。", refs: "CC01—CC03、CC17" },
      { text: "Remote 需受控电脑在线。Cloud 在云环境执行，须在该环境连接仓库并准备依赖。", refs: "CC11、CC12" },
      { text: "动态编排与组织功能各有权益要求。Windows 上使用内置命令隔离需经 WSL2。", refs: "CC08、CC13、CC14、CC18" },
    ],
  },
  "08": {
    summary: "Canva 设计平台中的 AI 能力，可生成海报和演示，并在原画布继续改文字、对象与版式。",
    canDo: [
      "按文字、参考文件或品牌素材生成海报和演示，继续调整版式。",
      "用 Magic Layers 尝试从平面图拆出文字、对象和背景。",
      "在 Canva Code 制作测验、计算器或互动网页。",
    ],
    deliverables: [
      "可编辑的演示、海报或保留图层的设计画布。",
      "可在 Canva 或发布页面中使用的互动组件。",
    ],
    example: {
      title: "改一张平面海报里的错字和位置",
      input: "一张 JPEG 或 PNG 海报，以及要修改的标题和元素位置。",
      steps: ["上传海报并用 Magic Layers 尝试拆层", "检查文字和元素", "改错字并移动对象"],
      output: "含可改文本框和可移动对象的 Canva 画布。",
      evidenceType: "官方教程",
      ref: "CV07",
      source: {
        title: "Canva 官方指南 · Magic Layers",
        url: "https://www.canva.com/magic-layers/",
      },
    },
    conditions: [
      { text: "Magic Layers 仍为 beta，受额度限制。复杂版式、字体及遮挡对象的还原程度须检查。", refs: "CV06、CV07" },
      { text: "Brush 按账号权益开放，适用于受支持的设计类型。", refs: "CV04、CV11" },
      { text: "canva.cn 暂无 Canva Code。互动保留在 Canva 或发布网站中，静态导出无法保留运行逻辑。", refs: "CV09" },
    ],
  },
  "09": {
    summary: "视频创作平台，可选用不同模型生成和局部修改镜头，再把片段、旁白与音乐编排成视频。",
    canDo: [
      "用文字或参考图生成镜头，按动作与构图要求迭代。",
      "在 Edit Studio 修改关键帧，再把改动用于指定时段。",
      "用 Agent 规划镜头，在时间线上剪切、排序并调整配音。",
    ],
    deliverables: [
      "生成的新镜头，或按指定外观修改后的视频片段。",
      "由多段镜头、旁白和音乐组装的时间线及视频。",
    ],
    example: {
      title: "修改现有视频中一段镜头的外观",
      input: "已有视频、要改的物体或背景，以及目标时段。",
      steps: ["从原片选关键帧", "用图像模型修改外观并选定预览", "由 Aleph 2.0 处理指定时段"],
      output: "修改后的视频片段，供回到时间线继续剪辑。",
      evidenceType: "官方教程",
      ref: "R03",
      source: {
        title: "Runway 官方指南 · 使用 Edit Studio 编辑视频",
        url: "https://help.runwayml.com/hc/en-us/articles/51683104370451-Creating-with-Edit-Studio",
      },
    },
    conditions: [
      { text: "Edit Studio 当前为 Single edit，处理片段最长 30 秒，另有镜头切换数量限制。", refs: "R03" },
      { text: "Gen-4.5、Aleph 2.0 为自研模型，Seedance 为第三方模型。可用模型、片长与额度按入口确认。", refs: "R02、R03、R05" },
      { text: "长成片通过时间线组装。局部修改的逐帧保真和跨镜头一致性待核实。", refs: "R01、R03、核验记录 §三" },
    ],
  },
  "10": {
    summary: "可把想法或剧本做成短剧项目，在同一处管理角色和分镜，重拍局部镜头并剪辑成片。",
    canDo: [
      "从想法或文稿组织剧本、人物、场景及分镜。",
      "引用角色和场景资产，生成或重拍单个镜头。",
      "在多轨时间线上剪辑画面，修改配音、音轨和字幕。",
    ],
    deliverables: [
      "可继续修改的短剧项目，包含角色、场景、分镜和镜头。",
      "剪辑后的多轨时间线及视频成片。",
    ],
    example: {
      title: "从办公室剧情文稿做短剧",
      input: "一份围绕办公室方案分歧的剧情文稿。",
      steps: ["确认角色、场景和分镜", "选择一镜重拍", "回到时间线编排画面、字幕和声音"],
      output: "可继续重拍和剪辑的项目，以及剪辑成片。",
      evidenceType: "研究概括",
      ref: "JM02、JM03",
      source: {
        title: "即梦AI 官方手册 · 短剧工作室",
        url: "https://jimeng.jianying.com/tutorials/drama-studio/product-manual",
      },
    },
    conditions: [
      { text: "短剧、导演及编辑模块的账号权限、额度和各端覆盖仍待核实。", refs: "JM01、JM02" },
      { text: "三维导演模式用于镜头预演，输出截图、录制或渲染参考供后续生成。", refs: "JM05" },
      { text: "教程提供去剪映编辑的入口。完整工程、字幕与音轨能否往返仍待核实。", refs: "JM03" },
    ],
  },
  "11": {
    summary: "涵盖配音、转写、音乐和实时语音对话的音频产品线，也能为已有视频制作外语配音。",
    canDo: [
      "合成旁白和多角色对白，按权益克隆声音，也可制作音乐与音效。",
      "转写录音并标注说话人，或把已有视频翻译配音。",
      "在 ElevenAgents 配置实时对话、知识库和已授权工具。",
    ],
    deliverables: [
      "旁白、音乐、音效或目标语言的译配音轨。",
      "带时间戳和说话人标签的转写文本，可用于整理字幕。",
      "可接入知识库及工具的实时语音服务。",
    ],
    example: {
      title: "给一段视频换上外语配音",
      input: "原音频或视频，以及目标语言。",
      steps: ["识别说话人并自动译配", "人工核对和修改译文", "重新生成修改过的片段"],
      output: "经修订的目标语言音轨。",
      evidenceType: "研究概括",
      ref: "EL07",
      source: {
        title: "ElevenLabs 官方文档 · 翻译配音",
        url: "https://elevenlabs.io/docs/eleven-creative/products/dubbing",
      },
    },
    conditions: [
      { text: "Creative、Agents 与 API 分别看权益。Dubbing 可在界面修改译文，API 的同类编辑需要企业权益。", refs: "EL04、EL07" },
      { text: "Professional 声音克隆须本人验证，并按要求提供声音样本。", refs: "EL06" },
      { text: "对话轮次、知识库和工具属于 ElevenAgents 的配置。Realtime 按工作区开放。", refs: "EL03、EL04" },
    ],
  },
  "12": {
    summary: "音乐创作应用，可从歌词或参考音频生成歌曲，并在 Studio 修改副歌、音轨与音符。",
    canDo: [
      "从歌词、哼唱、音频或参考画面生成完整歌曲。",
      "指定副歌或一段歌词，用文字指令局部重做。",
      "在 Studio 2.0 处理音轨、MIDI 音符和效果。",
    ],
    deliverables: [
      "完整歌曲，或按选定片段重做后的版本。",
      "可继续编排的分轨音频、MIDI 等制作素材。",
    ],
    example: {
      title: "给一首歌换一段副歌",
      input: "已有歌曲，以及把副歌改成福音合唱的要求。",
      steps: ["选中副歌片段", "用自然语言重做该段", "在 Studio 调轨并试听衔接"],
      output: "更新后的歌曲，以及按需导出的分轨音频。",
      evidenceType: "研究概括",
      ref: "SU01、SU04",
      source: {
        title: "Suno 官方介绍 · v6 局部修改示例",
        url: "https://suno.com/blog/introducing-v6",
      },
    },
    conditions: [
      { text: "Studio 2.0 为 Premier 权益。歌曲生成模型也按套餐开放。", refs: "SU03、SU04" },
      { text: "Bridge 仍为 beta，限 Premier 用户在 Mac 上配合 Ableton Live 12 使用。", refs: "SU07" },
      { text: "分轨还原度与局部修改的衔接质量待验证。新片段可能偏离原拍点。", refs: "SU01、SU04" },
    ],
  },
  "13": {
    summary: "中文语音工作台，可制作配音、设计或复刻音色并提取人声，关联开放平台还可转写录音。",
    canDo: [
      "在网页输入台词，选音色并调整语速、音调和停顿。",
      "按描述设计声音，或用获授权的录音样本克隆音色。",
      "用网页工作台提取人声，用关联 ASR API 转写录音。",
    ],
    deliverables: [
      "配音或提取的人声音频，以及按权益保存的定制音色。",
      "ASR API 返回的文稿或 SRT、VTT 字幕。",
    ],
    example: {
      title: "设计一个年迈智者的声音并配音",
      input: "音色描述（如年迈、沉稳）与一段试听台词。",
      steps: ["在音色设计页生成预览", "试听并按账号权益保存音色", "选用该音色生成配音"],
      output: "定制音色预览，具备保存和使用权限时可生成配音文件。",
      evidenceType: "研究概括",
      note: "据官方音色设计页面整理",
      ref: "MM01、MM03",
      source: {
        title: "MiniMax 官方音色设计页面",
        url: "https://www.minimax.cn/audio/voice-design",
      },
    },
    conditions: [
      { text: "网页音色的保存和生成取决于账号权益。声音克隆需样本授权，免费用户仅可预览。", refs: "MM01—MM03" },
      { text: "ASR API 的输入是录音文件。流式模式逐步返回文字，SRT、VTT 走非流式输出。", refs: "MM08、核验记录 §一" },
      { text: "中文音乐工作台的账号开放范围待核实。Music 3.0 已作为关联模型发布。", refs: "MM10—MM12、核验记录 §二" },
    ],
  },
  "14": {
    summary: "世界模型，根据方向、视角和文字指令持续生成可探索的场景、后续画面与声音。",
    canDo: [
      "用文字或参考图建立可以继续探索的环境。",
      "用按键移动或改变视角，影响接下来生成的内容。",
      "在体验中用文字调整天气、人物或物体等场景要素。",
    ],
    deliverables: [
      "可随动作演化、继续导航的交互式环境体验。",
      "在环境中随交互继续生成的画面和声音。",
    ],
    example: {
      title: "走进一张插画里的城市",
      input: "一张城市插画与保留画风、城市环境声的要求。",
      steps: ["以参考图建立场景", "操纵视角转入街道", "调整场景要求并继续探索"],
      output: "可转动视角、随行动持续生成画面和声音的城市模拟体验。",
      evidenceType: "官方演示",
      ref: "G01、G02",
      source: {
        title: "Google DeepMind 官方 Genie 研究说明",
        url: "https://deepmind.google/models/genie/",
      },
    },
    conditions: [
      { text: "目前仅确认可信测试者研究预览。现行 Project Genie 帮助对应 Genie 3，Genie 4 的订阅和开发者开放范围待核实。", refs: "G01、G02、G04、核验记录 §二" },
      { text: "长时间探索或多次改写时，空间位置和物体细节可能漂移。", refs: "G02" },
      { text: "可导出的 3D 工程、长期一致性和现实机器人迁移效果尚未验证。", refs: "G01、G02" },
    ],
  },
};
