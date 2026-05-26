import type { LiteratureItem } from '../types';

/**
 * PAINT Lab (Photonics And Instrumentation for NanoTechnology)
 * 仇旻实验室 - 西湖大学工学院
 * 真实发表论文数据，来源: https://qiu.lab.westlake.edu.cn/ky/fblw.htm
 */

export const MOCK_LITERATURE: LiteratureItem[] = [
  {
    id: 'lit-2025-362',
    title: 'Winding coupling phase for pseudo-spin-derived topological photonics',
    zhTitle: '赝自旋拓扑光子学中的缠绕耦合相位',
    authors: ['Tianyuan Liu', 'Min Qiu*', 'Wei Yan'],
    abstract: 'We demonstrate a winding coupling phase approach for pseudo-spin-derived topological photonics, enabling robust light transport with enhanced control over photonic edge states.',
    year: 2025, source: 'Nature Communications',
    url: 'https://www.nature.com/articles/s41467-025-67627-2',
    citationCount: 12, relevanceScore: 95,
    keywords: ['拓扑光子学', 'topological photonics', '赝自旋', 'pseudo-spin', '耦合相位', 'coupling phase', '光传输', 'light transport'],
  },
  {
    id: 'lit-2025-361',
    title: 'Geometrical Tailoring of Shockley-Ramo Bipolar Photocurrent in Self-Powered GaAs Nanodevices',
    zhTitle: '自供电GaAs纳米器件中Shockley-Ramo双极光电流的几何调控',
    authors: ['Xiaoguo Fang', 'Huanyi Xue*', 'Xuhui Mao', 'Feilin Chen', 'Ludi Qin', 'Haiyue Pei', 'Zhong Chen', 'Pingping Chen', 'Ding Zhao', 'Zhenghua An*', 'Min Qiu*'],
    abstract: 'We report the geometrical tailoring of Shockley-Ramo bipolar photocurrent in self-powered GaAs nanodevices, achieving efficient photocurrent generation without external bias.',
    year: 2025, source: 'Advanced Optical Materials',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/adom.202401597',
    citationCount: 8, relevanceScore: 93,
    keywords: ['微纳光电子', 'optoelectronic', 'GaAs', '光电流', 'photocurrent', '自供电', 'self-powered', '纳米器件', 'nanodevice'],
  },
  {
    id: 'lit-2025-355',
    title: 'Ice-assisted van der Waals metal contact with halide perovskites',
    zhTitle: '冰刻辅助卤化物钙钛矿范德华金属接触',
    authors: ['Yihan Lu', 'Bangjie Song', 'Xinyu Sun', 'Binbin Jin*', 'Ding Zhao*', 'Siying Peng*', 'Min Qiu'],
    abstract: 'We present an ice-assisted approach for forming van der Waals metal contacts with halide perovskites, leveraging ice properties for clean, damage-free metal deposition.',
    year: 2025, source: 'Device (Cell Press)',
    url: 'https://www.cell.com/device/fulltext/S2666-6386(25)00412-3',
    citationCount: 15, relevanceScore: 91,
    keywords: ['冰刻技术', 'ice lithography', '钙钛矿', 'perovskite', '范德华', 'van der Waals', '金属接触', 'metal contact'],
  },
  {
    id: 'lit-2025-356',
    title: 'Breakthroughs in Large-Scale Intelligent Photonic Computing Inference',
    zhTitle: '大规模智能光子计算推断的突破',
    authors: ['Jing Pan', 'Zhihao Li', 'Min Qiu*'],
    abstract: 'This review covers recent breakthroughs in large-scale intelligent photonic computing inference systems and photonic neural network architectures.',
    year: 2025, source: 'Chinese Science Bulletin',
    url: 'https://www.sciencedirect.com/science/article/pii/S1001846525003721',
    citationCount: 22, relevanceScore: 90,
    keywords: ['光计算', 'photonic computing', '智能推断', 'inference', '光子神经网络', 'photonic neural network', 'AI加速', 'AI accelerator'],
  },
  {
    id: 'lit-2025-354',
    title: 'Femtosecond laser-induced CSiVC color centers on the surface of N-doped 4H-SiC',
    zhTitle: '飞秒激光在N掺杂4H-SiC表面诱导CSiVC色心',
    authors: ['Xiaoyu Sun', 'Xuhu Han', 'Haochen Wang', 'Haojie Zheng', 'Qiannan Jia', 'Lei Zhang', 'Xinyu Sun', 'Chen Chen', 'Xiaoguo Fang', 'Liping Shi', 'Fengjiang Liu', 'Dongli Liu', 'Zhiqi Zhang', 'Yu Xie', 'Lijing Zhong', 'Wei Yan', 'Jianrong Qiu', 'Min Qiu*'],
    abstract: 'We demonstrate femtosecond laser-induced creation of CSiVC color centers on the surface of N-doped 4H-SiC for quantum sensing applications.',
    year: 2025, source: 'Optics Letters',
    url: 'https://opg.optica.org/ol/abstract.cfm?uri=ol-50-19-5981',
    citationCount: 6, relevanceScore: 89,
    keywords: ['飞秒激光加工', 'femtosecond laser', 'SiC', '碳化硅', '色心', 'color center', '量子传感', 'quantum sensing'],
  },
  {
    id: 'lit-2025-357',
    title: 'Controlled Growth of Multifilament Structures with Deep Subwavelength Features in SiC via Ultrafast Laser Processing',
    zhTitle: '超快激光加工SiC深亚波长多丝结构的控制生长',
    authors: ['Xiaoyu Sun', 'Haojie Zheng', 'Qiannan Jia', 'Limin Qi', 'Zhiqi Zhang', 'Lijing Zhong*', 'Wei Yan*', 'Jianrong Qiu*', 'Min Qiu*'],
    abstract: 'We report controlled growth of multifilament structures with deep subwavelength features in SiC via ultrafast laser processing.',
    year: 2025, source: 'Photonics',
    url: 'https://www.mdpi.com/2304-6732/12/10/973',
    citationCount: 4, relevanceScore: 87,
    keywords: ['激光微纳加工', 'laser processing', 'SiC', '碳化硅', '亚波长结构', 'subwavelength', '多丝结构', 'multifilament'],
  },
  {
    id: 'lit-2025-359',
    title: 'Substrate Selection for Ice Lithography on Living Tardigrades',
    zhTitle: '活体水熊虫冰刻光刻的衬底选择',
    authors: ['Zhirong Yang', 'Ding Zhao', 'Min Qiu'],
    abstract: 'We investigate substrate selection criteria for ice lithography performed on living tardigrades, establishing optimal conditions for high-resolution nanofabrication on biological specimens.',
    year: 2025, source: 'Journal of Physics: Conference Series',
    url: 'https://iopscience.iop.org/article/10.1088/1742-6596/3100/1/012002',
    citationCount: 3, relevanceScore: 85,
    keywords: ['冰刻技术', 'ice lithography', '水熊虫', 'tardigrade', '纳米加工', 'nanofabrication', '生物样品', 'biological'],
  },
  {
    id: 'lit-2024-342',
    title: '4H-SiC Metalens: Mitigating Thermal Drift Effect in High-Power Laser Irradiation',
    zhTitle: '4H-SiC超透镜：抑制高功率激光辐照的热漂移效应',
    authors: ['Boqu Chen', 'Xiaoyu Sun', 'Xiaoxuan Li', 'Lu Cai', 'Ding Zhao*', 'Kaikai Du*', 'Meiyan Pan*', 'Min Qiu*'],
    abstract: 'We design and demonstrate a 4H-SiC metalens capable of mitigating thermal drift effects under high-power laser irradiation, enabling stable focusing at elevated power levels.',
    year: 2024, source: 'Advanced Materials',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/adma.202412414',
    citationCount: 38, relevanceScore: 96,
    keywords: ['SiC超透镜', 'SiC metalens', '碳化硅', 'silicon carbide', '超透镜', 'metalens', 'AR', '增强现实', 'augmented reality', '热漂移', 'thermal drift'],
  },
  {
    id: 'lit-2024-343',
    title: 'Ultrafast Laser Inkless Full-Color Printing on Flexible and Thermolabile Substrates',
    zhTitle: '柔性热敏衬底上的超快激光无墨全彩打印',
    authors: ['Zhewei Wang', 'Liye Xu', 'Zhefeng Zhang', 'Kaikai Du*', 'Wei Yan*', 'Weicheng Cui*', 'Min Qiu*'],
    abstract: 'We demonstrate ultrafast laser inkless full-color printing on flexible substrates, producing vivid color patterns without inks using only laser-induced structural color.',
    year: 2024, source: 'Advanced Optical Materials',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/adom.202402293',
    citationCount: 45, relevanceScore: 94,
    keywords: ['飞秒激光加工', 'femtosecond laser', '激光打印', 'laser printing', '结构色', 'structural color', '柔性电子', 'flexible electronics'],
  },
  {
    id: 'lit-2024-344',
    title: 'Micro-Rotors on Frictional Solid Surfaces via Optothermally-Invoked Chirality',
    zhTitle: '光热诱导手性驱动摩擦固体表面微转子',
    authors: ['Qiannan Jia', 'Zhiqi Zhang', 'Xiaoyu Sun', 'Wei Yan*', 'Min Qiu'],
    abstract: 'We demonstrate micro-rotors that rotate on frictional solid surfaces via optothermally-invoked chirality, driven by structured light without mechanical contact.',
    year: 2024, source: 'Laser & Photonics Reviews',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/lpor.202401370',
    citationCount: 18, relevanceScore: 92,
    keywords: ['光热', 'opto-thermal', '手性', 'chirality', '微转子', 'micro-rotor', '光操控', 'optical manipulation', '微机器人', 'microrobotics'],
  },
  {
    id: 'lit-2024-340',
    title: 'Fast and Efficient Inverse Design Framework for Multifunctional Metalenses',
    zhTitle: '多功能超透镜快速高效逆向设计框架',
    authors: ['Xixian Zu', 'Xiaoyu Sun', 'Wei Yan', 'Wei E. I. Sha*', 'Min Qiu*'],
    abstract: 'We present a fast inverse design framework for multifunctional metalenses combining deep learning with physics-based optimization.',
    year: 2024, source: 'Laser & Photonics Reviews',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/lpor.202400886',
    citationCount: 28, relevanceScore: 90,
    keywords: ['超表面', 'metasurface', '超透镜', 'metalens', '逆向设计', 'inverse design', '深度学习', 'deep learning'],
  },
  {
    id: 'lit-2024-338',
    title: 'Precise and Omnidirectional Opto-Thermo-Elastic Actuation in Van Der Waals Contacting Systems',
    zhTitle: '范德华接触系统中精确全向光热弹性驱动',
    authors: ['Qiannan Jia', 'Renjie Tang', 'Xiaoyu Sun', 'Weiwei Tang', 'Lan Li', 'Jiajie Zhu', 'Pan Wang', 'Wei Yan*', 'Min Qiu*'],
    abstract: 'We demonstrate precise omnidirectional opto-thermo-elastic actuation in van der Waals contacting systems, enabling controlled motion using structured light.',
    year: 2024, source: 'Advanced Science',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/advs.202401418',
    citationCount: 14, relevanceScore: 88,
    keywords: ['光热弹性', 'opto-thermo-elastic', '范德华', 'van der Waals', '光驱动', 'optical actuation', '微操控', 'micro-manipulation'],
  },
  {
    id: 'lit-2024-341',
    title: 'Liquid Hydrogen Temperature Cryostage for Ice-Assisted Electron-Beam Lithography',
    zhTitle: '液氢温区低温台用于冰刻辅助电子束光刻',
    authors: ['Rui Zheng', 'Limin Qi', 'Sizhuo Li', 'Zhihua Gan', 'Ding Zhao*', 'Min Qiu*'],
    abstract: 'We develop a liquid hydrogen temperature cryostage for ice-assisted electron-beam lithography, enabling high-resolution nanofabrication at extremely low temperatures.',
    year: 2024, source: 'IEEE Transactions on Instrumentation and Measurement',
    url: 'https://ieeexplore.ieee.org/document/10764321',
    citationCount: 9, relevanceScore: 86,
    keywords: ['冰刻技术', 'ice lithography', '电子束光刻', 'electron-beam lithography', '低温', 'cryogenic', '纳米加工', 'nanofabrication'],
  },
  {
    id: 'lit-2023-322',
    title: 'Night-time radiative warming using the atmosphere',
    zhTitle: '利用大气实现夜间辐射加热',
    authors: ['Yining Zhu', 'Yiwei Zhou', 'Bing Qin', 'Rui Qin', 'Min Qiu', 'Qiang Li*'],
    abstract: 'We propose night-time radiative warming using the atmosphere as a heat source, leveraging atmospheric transparency window for passive warming.',
    year: 2023, source: 'Light: Science & Applications',
    url: 'https://www.nature.com/articles/s41377-023-01302-3',
    citationCount: 78, relevanceScore: 91,
    keywords: ['辐射加热', 'radiative warming', '大气', 'atmosphere', '热管理', 'thermal management', '能源', 'energy'],
  },
  {
    id: 'lit-2023-323',
    title: 'Fiber-Integrated Force Sensor using 3D Printed Spring-Composed Fabry-Perot Cavities with a High Precision Down to Tens of Piconewton',
    zhTitle: '光纤集成力传感器：3D打印弹簧法布里-珀罗腔实现十皮牛级精度',
    authors: ['Xinggang Shang', 'Ning Wang*', 'Simin Cao', 'Hehao Chen', 'Dixia Fan', 'Nanjia Zhou*', 'Min Qiu*'],
    abstract: 'We present a fiber-integrated force sensor using 3D printed Fabry-Perot cavities achieving precision down to tens of piconewton.',
    year: 2023, source: 'Advanced Materials',
    url: 'https://onlinelibrary.wiley.com/doi/10.1002/adma.202305121',
    citationCount: 52, relevanceScore: 89,
    keywords: ['光纤传感器', 'fiber sensor', '3D打印', '3D printing', '法布里珀罗', 'Fabry-Perot', '皮牛级', 'piconewton'],
  },
  {
    id: 'lit-2023-320',
    title: 'Laser-induced deep-subwavelength periodic nanostructures with large-scale uniformity',
    zhTitle: '大规模均匀激光诱导深亚波长周期性纳米结构',
    authors: ['Jiao Geng', 'Liping Shi*', 'Jukun Liu', 'Liye Xu', 'Wei Yan', 'Min Qiu*'],
    abstract: 'We demonstrate fabrication of laser-induced deep-subwavelength periodic nanostructures with large-scale uniformity for structural color applications.',
    year: 2023, source: 'Applied Physics Letters',
    url: 'https://pubs.aip.org/aip/apl/article/122/2/021104/2874369',
    citationCount: 35, relevanceScore: 87,
    keywords: ['飞秒激光加工', 'femtosecond laser', '亚波长结构', 'subwavelength', '周期性纳米结构', 'periodic nanostructure', '结构色', 'structural color'],
  },
  {
    id: 'lit-2023-321',
    title: 'Nanomotion of micro-objects driven by light-induced elastic waves on solid interfaces',
    zhTitle: '固体界面光诱导弹性波驱动微物体纳米运动',
    authors: ['Wei Lyu', 'Weiwei Tang', 'Wei Yan*', 'Min Qiu*'],
    abstract: 'We report nanomotion of micro-objects driven by light-induced elastic waves on solid interfaces, enabling contactless manipulation with nanometer precision.',
    year: 2023, source: 'Physical Review Applied',
    url: 'https://journals.aps.org/prapplied/abstract/10.1103/PhysRevApplied.19.024049',
    citationCount: 42, relevanceScore: 86,
    keywords: ['光诱导', 'light-induced', '弹性波', 'elastic wave', '微物体', 'micro-object', '纳米运动', 'nanomotion', '光操控', 'optical manipulation'],
  },
  {
    id: 'lit-2022-ar',
    title: '3.8-gram AR Waveguide: Ultralight, Mass-Producible, Rainbow-Artifact-Free SiC Diffractive Optical Waveguide for Augmented Reality',
    zhTitle: '3.8克超轻AR光波导：可量产无彩虹伪影碳化硅衍射光波导',
    authors: ['Kaikai Du*', 'Lu Cai', 'Boqu Chen', 'Min Qiu*'],
    abstract: 'We report a 3.8-gram ultralight, mass-producible, rainbow-artifact-free SiC diffractive optical waveguide for AR displays, nominated for 2025 Light10.',
    year: 2024, source: 'Research highlight',
    url: 'https://qiu.lab.westlake.edu.cn/info/1022/1725.htm',
    citationCount: 65, relevanceScore: 98,
    keywords: ['AR光波导', 'AR waveguide', '碳化硅', 'SiC', '超轻', 'ultralight', '衍射光波导', 'diffractive waveguide', '增强现实', 'augmented reality'],
  },
  {
    id: 'lit-2022-ice',
    title: 'Ice Lithography: An Electron-Beam Lithography Technique Using Ice Resist',
    zhTitle: '冰刻光刻：以冰为抗蚀剂的电子束光刻技术',
    authors: ['Ding Zhao', 'Min Qiu*'],
    abstract: 'Ice lithography uses ice as a resist material for high-resolution nanofabrication, demonstrated on living tardigrades (Nature 2025 Best Science Image).',
    year: 2023, source: 'Method paper',
    url: 'https://qiu.lab.westlake.edu.cn/info/1022/1475.htm',
    citationCount: 89, relevanceScore: 97,
    keywords: ['冰刻技术', 'ice lithography', '电子束光刻', 'electron-beam lithography', '水熊虫', 'tardigrade', '纳米加工', 'nanofabrication', 'Nature最佳图片'],
  },
];

/**
 * 搜索文献 - 同时匹配英文标题、中文标题、作者、来源和关键词
 */
export function searchLiterature(query: string): LiteratureItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return MOCK_LITERATURE;

  return MOCK_LITERATURE
    .filter((item) => {
      // 1. 英文标题匹配
      if (item.title.toLowerCase().includes(q)) return true;
      // 2. 中文标题匹配
      if (item.zhTitle.includes(q)) return true;
      // 3. 作者匹配
      if (item.authors.some((a) => a.toLowerCase().includes(q))) return true;
      // 4. 期刊来源匹配
      if (item.source.toLowerCase().includes(q)) return true;
      // 5. 关键词匹配（中英文）
      if (item.keywords.some((kw) => kw.toLowerCase().includes(q))) return true;
      // 6. 摘要匹配
      if (item.abstract.toLowerCase().includes(q)) return true;
      return false;
    })
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * 获取所有唯一关键词（用于推荐标签展示）
 */
export function getAllKeywords(): string[] {
  const zhKeywords = new Set<string>();
  MOCK_LITERATURE.forEach((item) => {
    item.keywords.forEach((kw) => {
      // 只保留中文关键词（不含英文字母的）
      if (/[\u4e00-\u9fff]/.test(kw)) {
        zhKeywords.add(kw);
      }
    });
  });
  return Array.from(zhKeywords);
}
