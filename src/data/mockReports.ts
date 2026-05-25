import type { WeeklyReport, UploadFile, PersonStatusChange } from '../types';

export const MOCK_REPORTS: WeeklyReport[] = [
  {
    id: 'wr-p1', personId: 'p1', personName: '严巍', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）墨南金片PL文章：拟写文章，预计五一劳动节内（还剩2-3天工作量）完成正文；此外，开始补充SI部分；', category: 'progress' }, { content: '（2）天远随机介质涡旋文章：根据仇老师组会建议，讨论明确文章novelty。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）五一节内完成PL文章正文。'], personStatusChanges: [],
  },
  {
    id: 'wr-p2', personId: 'p2', personName: '陈瑞溢', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）激光无油墨设备和激光彩钛技术的合作进展。', category: 'progress' }, { content: '1）继续对激光加工的参数进行优化（尝试多次加工而提升亮度的实验），继续建立图片库。', category: 'progress' }, { content: '2）宝瑞华公司合作。收到关于首批寄出的样品的反馈，需要对分辨率和亮度提升。根据所提的需求制定了如下的方案：', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）继续和西湖仪器沟通并明确设备开发的细节。继续跟进多个公司的合作；', '（2）对豪杰的毕业论文和答辩进行讨论，明确的研究课题和研究工作计划。'], personStatusChanges: [],
  },
  {
    id: 'wr-p3', personId: 'p3', personName: '潘婧', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）光计算论文投稿：', category: 'progress' }, { content: '1）Introduction中新增“temporal multiplexing computing”小节，并引用以下参考文献：', category: 'progress' }, { content: 'Xia et al., Nonlinear optical encoding enabled by recurrent linear scattering Na', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）光纤端面光计算实验推进。'], personStatusChanges: [],
  },
  {
    id: 'wr-p4', personId: 'p4', personName: '谢宇', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）回复light审稿意见：', category: 'progress' }, { content: '1）整理文稿并多轮核查（目前进度95%）；', category: 'progress' }, { content: '2）补充基本表征图（侧壁粗糙度等指标，但深槽无法用AFM进行表征）；', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）FIB刻蚀10×10 um2的方块结构，并AFM表征底面粗糙度；', '（2）仿真分析SiC像素化可调热辐射器件；'], personStatusChanges: [],
  },
  {
    id: 'wr-p5', personId: 'p5', personName: '薛环一', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）撰写飞霖小工作文章。以及补测一些实验，如 TEM原子像，Hallbar载流子迁移率 等等；', category: 'progress' }, { content: '（2）调试SThM系统，终于排查到了SThM系统的电噪声来源。待节后进行低温测试，并验证加热带缠绕腔体烘烤水汽的效果。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['暂无'], personStatusChanges: [],
  },
  {
    id: 'wr-p6', personId: 'p6', personName: '赵康', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）干冰冰刻文章格式修改：', category: 'progress' }, { content: '对编辑提出的格式修改意见进行了数据处理。', category: 'progress' }, { content: '（2）水熊表面热分布仿真:', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）与治蓉一起完善水熊体表等离激元阵列光热转化和局部温升的仿真；', '（2）并进行玻璃化冷冻（快速冷冻）的液氮环境存活实验；准备下一轮的冷冻传输SEM实验；'], personStatusChanges: [],
  },
  {
    id: 'wr-p7', personId: 'p7', personName: '孙歆语', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）论文根据书记还有严老师的意见，在立意和框架方面进行了反复斟酌和修改。正文增加了一张关于剥离后材料性质的对比图片，将部分光学表征移到了SI。这周会发给仇老师', category: 'progress' }, { content: '（2）本周进行了2次冰刻实验。用于进行制备剥离转移实验样品，目前在转移方面仍然存在困难；', category: 'progress' }, { content: '（3）和书记讨论的过程中我们诞生了下一个可以做的工作的想法，目前在准备相关实验材料。我们计划结合苯甲醚可剥离结构和冰辅助层，实现极小线宽的金属半导体范德华接触。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['暂无'], personStatusChanges: [],
  },
  {
    id: 'wr-p8', personId: 'p8', personName: '薛淑雯', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）基于前期消色差超透镜的设计基础，本周重点采用非线性相位补偿方法对透镜性能进行优化升级。完成了直径 90μm 超透镜在 400-1700nm 宽波段的聚焦特', category: 'progress' }, { content: '图 1 双面跨波段超透镜聚焦效果图', category: 'progress' }, { content: '完成了基于角谱法的 532nm/3.3μm 跨波段双面超透镜设计优化，仿真结果表明该结构能够同时实现两个目标波段的有效聚焦，初步达成了双波段共光路成像的设计目标', category: 'progress' }], problems: ['（1）在开展大尺寸消色差超透镜设计时，由于微纳结构单元数量呈指数级增长，全结构 FDTD 仿真计算量巨大，单轮仿真耗时过长，严重制约了设计迭代速度；', '（2）碳化硅材料 3.3μm 波段相位覆盖不足针对周期 1500nm、高度 2μm 的碳化硅微纳单元结构，仿真发现其在 3.3μm 红外波段的相位调制范围无法覆'], nextWeekPlan: ['（1）完成 532nm/3.3μm 双波段双面超透镜的结构定型设计，开展角谱法仿真结果与 FDTD 全波仿真结果的对比验证，确保设计精度；', '（2）针对大尺寸超透镜仿真效率问题，完成基于非线性优化算法的相位补偿代码优化迭代。'], personStatusChanges: [],
  },
  {
    id: 'wr-p9', personId: 'p9', personName: '邵露青', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）单模光纤激光直写加工文章：完整版已撰写完毕，给其他老师过目后，收到修改意见，正在进行修改。', category: 'progress' }, { content: '（2）TEM实验：主要补测没有退火	强酸清洗、丙酮超声的S2样品以及600°氧气退火，强酸清洗、丙酮超声的S7号样品的TEM，以上实验进一步揭露：没有750nm', category: 'progress' }, { content: 'C样品 无退火', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）修改稿正文内容撰写；', '（2）单模光纤激光直写的文章内容修改。'], personStatusChanges: [],
  },
  {
    id: 'wr-p10', personId: 'p10', personName: '刘天远', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）本周为了进一步区分K(k,k)，K(k,k’)和Kn(k,k)三种描述对涡旋失效的描述，进行了补充数值实验，主要是把原本的高斯光入射区分为了平面波入射、贝', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）整理好这部分数值结果和理论推导的内容；', '（2）准备开题。'], personStatusChanges: [],
  },
  {
    id: 'wr-d1', personId: 'd1', personName: '林春博', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）PRL电子束力文章研究，与同类文章工作的深度调研，AI报告分析；', category: 'progress' }, { content: '（2）预投稿cover letter和abstrct修改，发送；', category: 'progress' }, { content: '（3）收到暑研同学的CV，了解背景进行初步沟通；', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['暂无'], personStatusChanges: [],
  },
  {
    id: 'wr-d2', personId: 'd2', personName: '李志浩', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）推进了FiberEnd的结构设计；', category: 'progress' }, { content: '推进了片内全反射结构的结构设计和zemax设计；', category: 'progress' }, { content: '（3）推进600nm周期的消色差透镜设计；', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）继续学习机器学习计算或者ONN相关的理论；', '（2）推进撰写SiC Review；'], personStatusChanges: [],
  },
  {
    id: 'wr-d3', personId: 'd3', personName: '欧玟', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）文章部分撰写了Introduction部分；', category: 'progress' }, { content: '（2）制备了12种结构的太阳能电池，挑选空气中稳定的结构，优化柔性器件的剥离实验。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）文章：Ultra-flexible OPV for wireless optoelectronic modulation of peripheral ne', '（2）实验：优化Figure2部分柔性器件剥离后的器件性能。'], personStatusChanges: [],
  },
  {
    id: 'wr-d4', personId: 'd4', personName: '王旭杰', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）修改毕业论文；', category: 'progress' }, { content: '（2）准备玻璃化冷冻所用样品；', category: 'progress' }, { content: '（3）准备硅藻样品。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）尝试玻璃化冷冻流程；', '（2）准备毕业论文答辩；'], personStatusChanges: [],
  },
  {
    id: 'wr-d5', personId: 'd5', personName: '陈博取', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）修改SiC多数并行激光加工系统文章；', category: 'progress' }, { content: '（2）开始动态可调碳化硅超表面方案验证，完成测试方案规划，共分为两种调控类型。第一种是单超透镜整体调控方案，在流道液体切换时整个器件是统一调控的。第二种是单超透', category: 'progress' }, { content: '（3）与国防科大的同学讨论相干合成项目的下一步规划，开始进行超透镜阵列设计。同时他们提出了基于两片碳化硅超透镜阵列实现光相控阵调制的想法，讨论方案可行性，后续将', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）碳化硅多束并行加工系统文章投稿；', '（2）开始动态可调碳化硅超表面制备。'], personStatusChanges: [],
  },
  {
    id: 'wr-d6', personId: 'd6', personName: '齐利民', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）协助仇老师进行答辩，拆装设备并寄回杭州验收；', category: 'progress' }, { content: '（2）选了毕业论文几个审稿人；', category: 'progress' }, { content: '（3）和曹老师推进闭式剩余工作', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['暂无'], personStatusChanges: [],
  },
  {
    id: 'wr-d7', personId: 'd7', personName: '卢奕含', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）整理Light审稿意见，本周已经结束2.5个与仿真相关的问题，还剩最后一个问题的第一小问没有回答。打算今晚发给书记和斌斌师兄审阅。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）回复Light审稿意见。'], personStatusChanges: [],
  },
  {
    id: 'wr-d8', personId: 'd8', personName: '孙潇雨', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）撰写毕业论文，微孔制备章节进度约50%。', category: 'progress' }, { content: '*与严老师讨论进展：', category: 'progress' }, { content: '暂未讨论。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）继续进行毕业论文碳化硅微孔制备章节的撰写。'], personStatusChanges: [],
  },
  {
    id: 'wr-d9', personId: 'd9', personName: '裴海月', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）小型V2：', category: 'progress' }, { content: '1）目标：配合做好系统发货到异地和恢复工作。文章转投；', category: 'progress' }, { content: '2）进度：已完成系统恢复。文章未完成转投，计划针对审稿意见的问题进行一些修改后，再投稿Cryogenics。', category: 'progress' }], problems: ['（1）需要找到新颖的器件设计，为文章提供光电方面的创新性。'], nextWeekPlan: ['（1）小型V2：文章修改，转投Cryogenics。', '（2）嵌入式：按规划推进.'], personStatusChanges: [],
  },
  {
    id: 'wr-d10', personId: 'd10', personName: '杨治蓉', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）金属有机冰结构加工：纯化器的预付款已经完成支付，等待制作发货；', category: 'progress' }, { content: '（2）苯甲醚金属结构加工：设备厂家维修结束，蒸发源已经收到，下周将进行安装；', category: 'progress' }, { content: '（3）金属结构加工应用探索——水熊虫背部金属结构光热反应驱动研究', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）继续跟进纯化器购买工作；', '（2）小电镜蒸发源安装；'], personStatusChanges: [],
  },
  {
    id: 'wr-d11', personId: 'd11', personName: '周子博', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）按照盲审专家意见修改大论文，进度为50%；', category: 'progress' }, { content: '（2）修改毕业答辩PPT，进度为10%。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）按照盲审专家意见修改大论文，预计进度为80%；', '（2）继续修改毕业答辩PPT，预计进度为50%。'], personStatusChanges: [],
  },
  {
    id: 'wr-d12', personId: 'd12', personName: '邓卉彤', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）盲审意见已全部收到（AABBB），已完成实验细节和绪论部分的修改。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）有两位专家的意见需要与柳老师讨论，尽快撰写完回复意见表，完成毕业论文定稿版本。'], personStatusChanges: [],
  },
  {
    id: 'wr-d13', personId: 'd13', personName: '王启南', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）钙钛矿/PEIE探测器：', category: 'progress' }, { content: '1）TRPL设备培训；', category: 'progress' }, { content: '2）探测器I-t曲线收集；', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）钙钛矿/PEIE探测器：', '1）TRPL设备考核及数据收集；'], personStatusChanges: [],
  },
  {
    id: 'wr-d14', personId: 'd14', personName: '欧阳祖希', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）文章进度跟踪：Sci. Bull. 当前 Under Review.', category: 'progress' }, { content: 'Fig1&2内容补充，开展规则孔实验：①探究并确定了从无序孔向规则孔转变的关键参数（单点曝光的点间距），如下图a，预计放入SI中；②在不同点间距下调控单点剂量控', category: 'progress' }, { content: '完成Fig.1的Caption及文字部分初版撰写；', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）Sci. Bull.文章进度跟踪；', '（2）完善厚度实验，对应更新Fig.2a-d；'], personStatusChanges: [],
  },
  {
    id: 'wr-d15', personId: 'd15', personName: '马墨南', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '按时间计划推进【文章一：OTE驱动表征】的旋转驱动精度表征部分。', category: 'progress' }, { content: '（1）在WOP系统下利用SLM对光束的整形，首次在WOP下实现了金片的旋转驱动。', category: 'progress' }, { content: '（2）进行了单脉冲独立作用与1kHz下100脉冲共同作用的旋转角度实验结果采集。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）实验采集完整单脉冲旋转结果、能量影响下的旋转驱动结果、离轴角度变化下的旋转驱动扫描结果；', '（2）对应进行数据处理。'], personStatusChanges: [],
  },
  {
    id: 'wr-d16', personId: 'd16', personName: '李晓萱', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）金刚石超透镜工作：', category: 'progress' }, { content: '1）修改figure 2和figure3，重拍空气中焦点，并编写代码处理数据；', category: 'progress' }, { content: '→', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）完成文章初稿。'], personStatusChanges: [],
  },
  {
    id: 'wr-d17', personId: 'd17', personName: '章子鉴', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）研究计划：', category: 'progress' }, { content: '1）本周重新调整了研究计划的进度安排，甘特图如下：', category: 'progress' }, { content: '研究计划的时间安排甘特图', category: 'progress' }], problems: ['（1）按照现在的进度，预计假期时间可以完成2到3轮设计代码的调参优化并得到相应的结果。在回校后可以完成初步的小口径器件上的可行性验证。'], nextWeekPlan: ['（1）仿真设计：', '1）回校后，5.6到5.17需要完成这套仿真设计方法在大口径器件上的验证。'], personStatusChanges: [],
  },
  {
    id: 'wr-d18', personId: 'd18', personName: '陈飞霖', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）本周进行球差TEM的制样与测试；', category: 'progress' }, { content: '（2）对于扫描热出现的噪声进行了系统性的排查，检查发现是插排存在接地不良的原因，并且各个仪器之间接地和高电位不平；', category: 'progress' }, { content: '（3）进行扫描热氮气放气气路的改造工作已经完成并进行了测试；', category: 'progress' }], problems: ['（1）本周文章补充了TEM数据，环一师兄在做修改，还在微调与改进。预计先投nanoletter还在与环一讨论'], nextWeekPlan: ['（1）针对扫描热的降温数据进行下一步微调改进。'], personStatusChanges: [],
  },
  {
    id: 'wr-d19', personId: 'd19', personName: '虞阳', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）推进基于碳化硅悬臂梁的计算光谱仪的实验测试部分，规划了测试的光路。除了需要自行搭建的光路之外，和平台角分辨光谱仪的老师和工程师进行了沟通，准备先微调一下现', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）完成可见光部分的实验测试，并测试实际重构能力是否符合预期。'], personStatusChanges: [],
  },
  {
    id: 'wr-d20', personId: 'd20', personName: '郑豪杰', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）本科生毕业论文：', category: 'progress' }, { content: '1）推进毕业论文的撰写，已经接近完成，下周和陈老师讨论一下论文细节并修改。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）继续推进本科毕业论文的撰写，并且和陈老师进行细节讨论并修改。'], personStatusChanges: [],
  },
  {
    id: 'wr-d21', personId: 'd21', personName: '陈代吉', weekNumber: 2, weekLabel: '2026年第2期 (04.27-04.30)', submittedAt: '2026-04-30',
    status: 'completed', workItems: [{ content: '（1）这周有周末考试，没有什么大的结果。开始读周子博给我的书和在等赵康分析我模拟的结果。', category: 'progress' }], problems: ['暂无'], nextWeekPlan: ['（1）约个时间跟赵康讨论模拟的结果和继续读TOPV的书。', '2026年4月30日'], personStatusChanges: [],
  },
];

export const MOCK_UPLOADS: UploadFile[] = [
  { id: 'upload-1', fileName: '附件1-仇旻教授团队科研工作周报2026.4.30研究员与博后.docx', fileSize: 1024*1024*2, uploadedAt: '2026-04-30T10:00:00Z', status: 'completed', parsedReportId: 'wr-2026-0430-r' },
  { id: 'upload-2', fileName: '附件2-仇旻教授团队科研工作周报2026.4.30-博士.docx', fileSize: 1024*1024*3, uploadedAt: '2026-04-30T10:05:00Z', status: 'completed', parsedReportId: 'wr-2026-0430-d' },
];

export const getPersonStatusChanges = (_weekLabel?: string): PersonStatusChange[] => [];

export const getPersonWeeklyData = (personId: string): any =>
  MOCK_REPORTS.find((r) => r.personId === personId);