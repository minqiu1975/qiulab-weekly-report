// WeekTrend interface defined below

export const TREND_LABELS = [
  '2026.01.09', '2026.01.16', '2026.01.23', '2026.01.30', '2026.02.06', '2026.02.12',
  '2026.03.06', '2026.03.13', '2026.03.20', '2026.03.27',
  '2026.04.03', '2026.04.10', '2026.04.17', '2026.04.24', '2026.04.30',
  '2026.05.09',
];

export function getLatestWeekLabel(): string {
  // 优先从动态标签中找最新日期（用户上传的周报）
  try {
    const dynLabels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
    if (dynLabels.length > 0) {
      // 排序后取最后一个（最新的）
      const sorted = [...dynLabels].sort();
      return sorted[sorted.length - 1];
    }
  } catch { /* ignore */ }
  return TREND_LABELS[TREND_LABELS.length - 1];
}

export function getLatestWeekDisplay(): string {
  const label = getLatestWeekLabel();
  return `${label.replace(/\./g, '年')}期`;
}

export interface WeekTrend {
  progress: number;
  problems: number;
  characterTag: string;
  summary: string;
}

export const PERSON_BASELINE_TRENDS: Record<string, WeekTrend[]> = {
  'p1': [
    { progress: 80, problems: 0, characterTag: '理论突破', summary: 'PL信号仿真，发现粗糙度模型遗漏FIB溅射效应，引入现象参数解释575nm和620nm双峰' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '理论完善', summary: '金片PL仿真引入溅射小颗粒LSPR模型解释双峰，OL文章回复信修改返给吕未' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '理论完善', summary: '金片PL双峰解释模型完善，OL文章回复信修改返吕未' }, // 2026.01.23
    { progress: 85, problems: 0, characterTag: '理论突破', summary: 'PL粗糙度模型反思改善，溅射小颗粒LSPR峰解释575nm，gap plasmon解释620nm，OL文章回复修改返吕未' }, // 2026.01.30
    { progress: 85, problems: 0, characterTag: '理论完善', summary: 'PL双峰解释（溅射LSPR+gap plasmon），OL文章回复信修改，春节计划矢量光场传播建模' }, // 2026.02.06
    { progress: 85, problems: 0, characterTag: '理论突破', summary: '金片PL双峰模型完善（溅射LSPR+gap plasmon），OL文章回复修改，春节矢量光场建模计划' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '严巍本周科研工作论文推进' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '严巍本周科研工作论文推进' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '严巍本周科研工作论文推进' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '论文冲刺', summary: '严巍本周科研工作论文冲刺' }, // 2026.03.27
  ],
  'p5': [
    { progress: 60, problems: 0, characterTag: '稳步推进', summary: '陈瑞溢本周科研工作稳步推进' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '皮秒激光打印软件灰度图方案确定，钛合金磨损测试（钢丝绒1000次褪色），国自然青年基金撰写' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '打印软件灰度图合同签订，控制卡寄出待安装，钛合金共聚焦表征发现压痕，国自然基金初稿投递' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '打印软件合同签订付款，控制卡寄出待安装，钛合金共聚焦表征发现压痕，国自然基金初稿投递' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '打印软件合同付款，控制卡寄出，钛合金共聚焦压痕发现，国自然基金初稿投递' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '打印软件合同签订，控制卡寄出，钛合金共聚焦压痕，国自然基金投递' }, // 2026.02.12
    { progress: 80, problems: 0, characterTag: '设备调试', summary: '陈瑞溢本周科研工作设备调试' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '工艺优化', summary: '陈瑞溢本周科研工作工艺优化' }, // 2026.03.13
    { progress: 85, problems: 0, characterTag: '工艺突破', summary: '陈瑞溢本周科研工作工艺突破' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '工艺优化', summary: '陈瑞溢本周科研工作工艺优化' }, // 2026.03.27
  ],
  'p6': [
    { progress: 60, problems: 0, characterTag: '稳步推进', summary: '潘婧本周科研工作稳步推进' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '论文冲刺', summary: 'SORD论文最终版敲定图片编码校对，青基申请书全部文字撰写完成' }, // 2026.01.16
    { progress: 85, problems: 0, characterTag: '论文投稿', summary: 'SORD论文全文检查SI检查参考文献插入，投稿Nature系列' }, // 2026.01.23
    { progress: 90, problems: 0, characterTag: '论文投稿', summary: 'SORD论文全文检查完成，投稿Nature-Nature Photonics-Nature Sensors-Nature Communications' }, // 2026.01.30
    { progress: 90, problems: 0, characterTag: '论文冲刺', summary: 'SORD论文投稿Nature系列，青基申请书润色配图，Fiber论文框架搭建' }, // 2026.02.06
    { progress: 90, problems: 0, characterTag: '论文冲刺', summary: 'SORD论文投稿Nature系列，青基润色配图，Fiber论文框架' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '专利布局', summary: '潘婧本周科研工作专利布局' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '多线并进', summary: '潘婧本周科研工作多线并进' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '论文修改', summary: '潘婧本周科研工作论文修改' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '论文修改', summary: '潘婧本周科研工作论文修改' }, // 2026.03.27
  ],
  'p3': [
    { progress: 85, problems: 1, characterTag: '仿真推进', summary: 'Audisk-Spacer-SiC阵列COMSOL多维度仿真，Ge隔离层光谱色散研究，Purcell因子计算，确定刻蚀参数' }, // 2026.01.09
    { progress: 85, problems: 1, characterTag: '实验推进', summary: 'Au-Ge-SiC微盘阵列FIB刻蚀完成，FTIR测试准备，SiC photonics综述撰写' }, // 2026.01.16
    { progress: 90, problems: 0, characterTag: '文章丰收', summary: 'LPR文章接收，SiC微槽天线投稿Light送审，fs激光结构化SiC热辐射源文章撰写，微球热辐射超分辨成像文章' }, // 2026.01.23
    { progress: 90, problems: 0, characterTag: '文章丰收', summary: 'COMSOL仿真与FDTD对比，fs激光微孔阵列仿真，LPR文章接收，SiC微槽天线投稿Light送审，热辐射源文章撰写' }, // 2026.01.30
    { progress: 90, problems: 0, characterTag: '文章丰收', summary: 'COMSOL与FDTD对比，fs激光微孔阵列，LPR接收，Light送审，热辐射源文章' }, // 2026.02.06
    { progress: 90, problems: 0, characterTag: '文章丰收', summary: 'COMSOL-FDTD对比，fs微孔阵列，LPR接收，Light送审，综述' }, // 2026.02.12
    { progress: 85, problems: 0, characterTag: '仿真推进', summary: '谢宇本周科研工作仿真推进' }, // 2026.03.06
    { progress: 85, problems: 0, characterTag: '仿真推进', summary: '谢宇本周科研工作仿真推进' }, // 2026.03.13
    { progress: 85, problems: 0, characterTag: '仿真推进', summary: '谢宇本周科研工作仿真推进' }, // 2026.03.20
    { progress: 85, problems: 0, characterTag: '仿真推进', summary: '谢宇本周科研工作仿真推进' }, // 2026.03.27
  ],
  'p7': [
    { progress: 80, problems: 0, characterTag: '设备突破', summary: 'MBE薄膜制备完成，器件制备解决漏电问题，GM制冷机20K下AFM形貌表征成功' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '20K低温AFM噪声分析，3D打印样品台重新优化设计，温控heater重新设计放置样品台底部' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '低温AFM噪声分析，3D打印样品台优化，温控heater redesign' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '低温AFM噪声分析，3D打印样品台重新设计，温控heater redesign' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '20K低温AFM噪声分析，样品台优化，温控 redesign' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '20K AFM噪声，样品台优化，温控 redesign' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '设备优化', summary: '薛环一本周科研工作设备优化' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '设备优化', summary: '薛环一本周科研工作设备优化' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '设备突破', summary: '薛环一本周科研工作设备突破' }, // 2026.03.20
    { progress: 70, problems: 0, characterTag: '设备优化', summary: '薛环一本周科研工作设备优化' }, // 2026.03.27
  ],
  'p8': [
    { progress: 70, problems: 1, characterTag: '实验探索', summary: '冷冻传输电镜实验：衣藻冷冻后全部死亡，设计分解实验排查；水凝胶电子器件调研；冰刻超构光纤文章定稿' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '基金文章', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜检查关机' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '基金文章', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜关机' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '基金文章', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜关机' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '基金文章', summary: '青基完成，超构光纤文章定稿，大电镜关机' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '基金文章', summary: '青基完成，超构光纤文章定稿，大电镜关机' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: '基金申请', summary: '赵康本周科研工作基金申请' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '基金提交', summary: '赵康本周科研工作基金提交' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '基金提交', summary: '赵康本周科研工作基金提交' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '审稿回复', summary: '赵康本周科研工作审稿回复' }, // 2026.03.27
  ],
  'p9': [
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '吕未本周科研工作多线并进' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: '光场调控', summary: '吕未本周科研工作光场调控' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '光场调控', summary: '吕未本周科研工作光场调控' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '光场调控', summary: '吕未本周科研工作光场调控' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '光场调控', summary: '吕未本周科研工作光场调控' }, // 2026.03.27
  ],
  'p10': [
    { progress: 75, problems: 0, characterTag: '论文整理', summary: '论文图片整理基本完成，正文所有图片内容确定，同步补充SI；二维材料转移系统调研采购' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '耦合强度理论解释新增先上升后下降趋势实验，结合文献调研场强解释' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '耦合强度理论新增先升后降趋势实验，文献调研场强解释' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '耦合强度理论新增先升后降实验，文献调研场强解释' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '耦合强度新增先升后降实验，文献调研' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '耦合强度先升后降实验，文献调研' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '理论推导', summary: '孙歆语本周科研工作理论推导' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '理论完善', summary: '孙歆语本周科研工作理论完善' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '理论完善', summary: '孙歆语本周科研工作理论完善' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '理论完善', summary: '孙歆语本周科研工作理论完善' }, // 2026.03.27
  ],
  'x1': [
    { progress: 75, problems: 1, characterTag: '仿真优化', summary: '400nm与600nm周期延迟范围对比仿真，600nm周期优势明显（0-24fs覆盖）；青年基金第一部分撰写' }, // 2026.01.09
    { progress: 80, problems: 1, characterTag: '基金撰写', summary: '青年基金申请书第二三部分完成（研究内容+可行性分析），600nm周期延迟范围0-24fs' }, // 2026.01.16
    { progress: 80, problems: 1, characterTag: '基金冲刺', summary: '青年基金第二三部分完成，申请书润色' }, // 2026.01.23
    { progress: 80, problems: 1, characterTag: '基金冲刺', summary: '青年基金第二三部分完成，申请书润色' }, // 2026.01.30
    { progress: 80, problems: 1, characterTag: '基金冲刺', summary: '青年基金二三部分完成，润色' }, // 2026.02.06
    { progress: 80, problems: 1, characterTag: '基金冲刺', summary: '青年基金二三部分完成，润色' }, // 2026.02.12
    { progress: 65, problems: 0, characterTag: '文献调研', summary: '薛淑雯本周科研工作文献调研' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '仿真优化', summary: '薛淑雯本周科研工作仿真优化' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '仿真优化', summary: '薛淑雯本周科研工作仿真优化' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '仿真优化', summary: '薛淑雯本周科研工作仿真优化' }, // 2026.03.27
  ],
  'p4': [
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '腔结构FDTD建模仿真（Q值340），悬臂梁孔阵列工艺摸索，退火实验多参数对比' }, // 2026.01.09
    { progress: 70, problems: 0, characterTag: '文章修改', summary: '文章修改，综述S5部分撰写提纲整理，仿真优化' }, // 2026.01.16
    { progress: 40, problems: 0, characterTag: '休假', summary: '提前申请调休' }, // 2026.01.23
    { progress: 40, problems: 0, characterTag: '休假', summary: '提前调休' }, // 2026.01.30
    { progress: 40, problems: 0, characterTag: '休假', summary: '调休' }, // 2026.02.06
    { progress: 40, problems: 0, characterTag: '休假', summary: '调休' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '低温测试', summary: '邵露青本周科研工作低温测试' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '数据分析', summary: '邵露青本周科研工作数据分析' }, // 2026.03.13
    { progress: 85, problems: 0, characterTag: '数据分析', summary: '邵露青本周科研工作数据分析' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '数据分析', summary: '邵露青本周科研工作数据分析' }, // 2026.03.27
  ],
  'p11': [
    { progress: 60, problems: 0, characterTag: '文献调研', summary: '阅读BIC综述和代表性文献，办理进站手续' }, // 2026.01.09
    { progress: 65, problems: 0, characterTag: '文献调研', summary: 'BIC综述文献阅读，粗糙版长introduction撰写中' }, // 2026.01.16
    { progress: 65, problems: 0, characterTag: '文献调研', summary: 'BIC文献阅读，粗糙版introduction撰写中，假期补习量子力学' }, // 2026.01.23
    { progress: 60, problems: 0, characterTag: '文献调研', summary: 'BIC文献阅读，粗糙版introduction，假期补习量子力学' }, // 2026.01.30
    { progress: 60, problems: 0, characterTag: '文献调研', summary: 'BIC文献，introduction，量子力学补习' }, // 2026.02.06
    { progress: 60, problems: 0, characterTag: '文献调研', summary: 'BIC文献，introduction，量子力学' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '理论攻坚', summary: '刘天远本周科研工作理论攻坚' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '理论推导', summary: '刘天远本周科研工作理论推导' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '理论攻坚', summary: '刘天远本周科研工作理论攻坚' }, // 2026.03.20
    { progress: 70, problems: 0, characterTag: '理论攻坚', summary: '刘天远本周科研工作理论攻坚' }, // 2026.03.27
  ],
  'd17': [
    { progress: 70, problems: 0, characterTag: '实验准备', summary: '反射率透射率光谱测试弹簧制备，画图，安装调试共聚焦侧向观察系统' }, // 2026.01.09
    { progress: 65, problems: 0, characterTag: '稳步推进', summary: '画图实验' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '反射率测量标定，光力计算拟合参数确定，弹簧k值0.001N/m，画图，FIB镀膜' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '反射率标定，光力拟合，弹簧k值0.001N/m，FIB镀膜' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '反射率标定，光力拟合，k值0.001N/m，画图，FIB镀膜' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '反射率标定光力拟合k值0.001N/m画图FIB镀膜' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: '方案规划', summary: '林春博本周科研工作方案规划' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '林春博本周科研工作实验推进' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '数据处理', summary: '林春博本周科研工作数据处理' }, // 2026.03.20
    { progress: 60, problems: 0, characterTag: '数据处理', summary: '林春博本周科研工作数据处理' }, // 2026.03.27
  ],
  'd19': [
    { progress: 75, problems: 0, characterTag: '器件制备', summary: '王启南本周科研工作器件制备' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '器件测试', summary: '王启南本周科研工作器件测试' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '器件测试', summary: '王启南本周科研工作器件测试' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '器件测试', summary: '王启南本周科研工作器件测试' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '器件测试', summary: '王启南本周科研工作器件测试' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '器件测试', summary: '王启南本周科研工作器件测试' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: 'TRPL表征', summary: '王启南本周科研工作TRPL表征' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: 'TRPL表征', summary: '王启南本周科研工作TRPL表征' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: 'TRPL表征', summary: '王启南本周科研工作TRPL表征' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: 'TRPL表征', summary: '王启南本周科研工作TRPL表征' }, // 2026.03.27
  ],
  'd15': [
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber Sensor Perception文章修改，SiC review整理，光计算设计，帮薛淑雯消色差透镜计算' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber Sensor文章修改，SiC review整理，光计算优化，消色差透镜设计，STOV时域图' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber Sensor文章修改完成，SiC review整理，光计算优化，消色差透镜设计' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber文章修改完成，SiC review，光计算优化，消色差透镜，STOV' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber文章完成，SiC review，光计算，消色差透镜，STOV' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'Fiber文章完成SiC review光计算消色差STOV' }, // 2026.02.12
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '李志浩本周科研工作多线并进' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '开题准备', summary: '李志浩本周科研工作开题准备' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '开题完成', summary: '李志浩本周科研工作开题完成' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '李志浩本周科研工作多线并进' }, // 2026.03.27
  ],
  'd13': [
    { progress: 70, problems: 1, characterTag: '实验突破', summary: '膜片钳电生理测试ITO/ZnO/C60/Te/Se/Au器件上神经细胞光激活结果' }, // 2026.01.09
    { progress: 75, problems: 1, characterTag: '实验推进', summary: '膜片钳测试神经细胞光激活，实验动物伦理申请，课题框架确定' }, // 2026.01.16
    { progress: 75, problems: 1, characterTag: '实验推进', summary: '膜片钳测试，实验动物伦理申请，课题框架Figure1-5确定' }, // 2026.01.23
    { progress: 75, problems: 1, characterTag: '实验推进', summary: '膜片钳测试，伦理申请，课题框架确定' }, // 2026.01.30
    { progress: 75, problems: 1, characterTag: '实验推进', summary: '膜片钳测试，伦理申请，课题框架' }, // 2026.02.06
    { progress: 75, problems: 1, characterTag: '实验推进', summary: '膜片钳测试伦理申请课题框架Figure1-5' }, // 2026.02.12
    { progress: 60, problems: 0, characterTag: '实验准备', summary: '欧玟本周科研工作实验准备' }, // 2026.03.06
    { progress: 65, problems: 0, characterTag: '柔性器件', summary: '欧玟本周科研工作柔性器件' }, // 2026.03.13
    { progress: 65, problems: 0, characterTag: '动物实验', summary: '欧玟本周科研工作动物实验' }, // 2026.03.20
    { progress: 85, problems: 0, characterTag: '动物突破', summary: '欧玟本周科研工作动物突破' }, // 2026.03.27
  ],
  'd1': [
    { progress: 70, problems: 0, characterTag: '毕业论文', summary: '毕业论文第二章碳化硅微纳光子器件研究基础撰写' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文第三章50%完成，Device文章proof' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文第三章50%，Device文章审稿意见回复' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文第三章50%，Device审稿回复' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文第二章完成，Device审稿回复' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文第二章完成第三章50% Device审稿回复' }, // 2026.02.12
    { progress: 85, problems: 0, characterTag: '论文冲刺', summary: '陈博取本周科研工作论文冲刺' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '毕业论文', summary: '陈博取本周科研工作毕业论文' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '预答辩', summary: '陈博取本周科研工作预答辩' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '论文修改', summary: '陈博取本周科研工作论文修改' }, // 2026.03.27
  ],
  'd3': [
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题报告提交，毕业论文绪论思路整理写了3K字，帮飞霖修温度计、帮治蓉焊接电阻' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题修改，毕业论文15K字绪论完成' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题修改，毕业论文15K字' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题，毕业论文15K字' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题修改，毕业论文15K字绪论完成' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '毕业准备', summary: '基金结题修改毕业论文15K字' }, // 2026.02.12
    { progress: 80, problems: 0, characterTag: '论文初稿', summary: '齐利民本周科研工作论文初稿' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '毕业准备', summary: '齐利民本周科研工作毕业准备' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '预答辩', summary: '齐利民本周科研工作预答辩' }, // 2026.03.20
    { progress: 60, problems: 0, characterTag: '论文修改', summary: '齐利民本周科研工作论文修改' }, // 2026.03.27
  ],
  'd2': [
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章正文基本完成，总进度95页' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章基本完成只剩图片，总进度100页' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章基本完成100页' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章100页' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章100页' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '毕业论文', summary: '大论文第五章100页' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '论文撰写', summary: '卢奕含本周科研工作论文撰写' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '审稿回复', summary: '卢奕含本周科研工作审稿回复' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '审稿回复', summary: '卢奕含本周科研工作审稿回复' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '审稿冲刺', summary: '卢奕含本周科研工作审稿冲刺' }, // 2026.03.27
  ],
  'd4': [
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '毕业论文修改再次送审，协助章子鉴消色差透镜测试和晓萱光路调试' }, // 2026.01.09
    { progress: 85, problems: 1, characterTag: '工艺优化', summary: '微孔加工工艺优化（15ps脉宽、25kHz重频、20000脉冲），孔深34μm，小面积阵列加工' }, // 2026.01.16
    { progress: 85, problems: 1, characterTag: '工艺优化', summary: '微孔工艺优化（15ps/25kHz/20000脉冲），孔深34μm，小面积阵列' }, // 2026.01.23
    { progress: 85, problems: 1, characterTag: '工艺优化', summary: '微孔优化（15ps/25kHz/20000脉冲），孔深34μm，阵列加工' }, // 2026.01.30
    { progress: 85, problems: 1, characterTag: '工艺优化', summary: '微孔工艺优化（15ps/25kHz/20000脉冲），孔深34μm' }, // 2026.02.06
    { progress: 85, problems: 1, characterTag: '工艺优化', summary: '微孔优化15ps/25kHz/20000脉冲孔深34μm阵列加工' }, // 2026.02.12
    { progress: 85, problems: 0, characterTag: '实验推进', summary: '孙潇雨本周科研工作实验推进' }, // 2026.03.06
    { progress: 80, problems: 0, characterTag: '实验优化', summary: '孙潇雨本周科研工作实验优化' }, // 2026.03.13
    { progress: 85, problems: 0, characterTag: '实验突破', summary: '孙潇雨本周科研工作实验突破' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '文章撰写', summary: '孙潇雨本周科研工作文章撰写' }, // 2026.03.27
  ],
  'd6': [
    { progress: 70, problems: 2, characterTag: '文章撰写', summary: '基金年度总结报告4项工作内容整理配图，小型化文章对比表格80%完成' }, // 2026.01.09
    { progress: 65, problems: 2, characterTag: '文章推进', summary: '小型化文章对比表格定稿，制冷芯片铟片密封漏气问题，热设计方法学习' }, // 2026.01.16
    { progress: 65, problems: 2, characterTag: '文章推进', summary: '小型化文章定稿，制冷芯片密封问题' }, // 2026.01.23
    { progress: 65, problems: 2, characterTag: '文章推进', summary: '小型化文章定稿' }, // 2026.01.30
    { progress: 65, problems: 2, characterTag: '文章推进', summary: '小型化文章定稿，制冷芯片密封' }, // 2026.02.06
    { progress: 65, problems: 2, characterTag: '文章推进', summary: '小型化文章定稿制冷芯片密封问题' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '文章投稿', summary: '裴海月本周科研工作文章投稿' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '设备维修', summary: '裴海月本周科研工作设备维修' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '设备攻坚', summary: '裴海月本周科研工作设备攻坚' }, // 2026.03.20
    { progress: 65, problems: 0, characterTag: '设备攻坚', summary: '裴海月本周科研工作设备攻坚' }, // 2026.03.27
  ],
  'd7': [
    { progress: 65, problems: 1, characterTag: '设备维修', summary: '冷台故障排查维修（加热电阻断路、温度计短路），水熊虫光热定向驱动方案设计（三阶段实验计划）' }, // 2026.01.09
    { progress: 60, problems: 0, characterTag: '方案设计', summary: '水熊虫体表金属结构光热驱动方案细化，文献阅读，水熊虫捕捉' }, // 2026.01.16
    { progress: 55, problems: 1, characterTag: '实验准备', summary: '冷台维修，水熊虫文献阅读，水熊虫捕捉' }, // 2026.01.23
    { progress: 55, problems: 1, characterTag: '实验准备', summary: '冷台维修，水熊虫文献，捕捉' }, // 2026.01.30
    { progress: 65, problems: 1, characterTag: '设备维修', summary: '冷台维修完成（加热电阻更换），水熊虫光热驱动方案设计' }, // 2026.02.06
    { progress: 65, problems: 1, characterTag: '设备维修', summary: '冷台故障维修完成加热电阻温度计更换水熊虫光热方案设计' }, // 2026.02.12
    { progress: 60, problems: 0, characterTag: '设备维修', summary: '杨治蓉本周科研工作设备维修' }, // 2026.03.06
    { progress: 65, problems: 0, characterTag: '设备维修', summary: '杨治蓉本周科研工作设备维修' }, // 2026.03.13
    { progress: 65, problems: 0, characterTag: '设备维修', summary: '杨治蓉本周科研工作设备维修' }, // 2026.03.20
    { progress: 60, problems: 0, characterTag: '设备维修', summary: '杨治蓉本周科研工作设备维修' }, // 2026.03.27
  ],
  'd8': [
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '大论文第三章实验部分完成，讨论部分完成50%' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '毕业冲刺', summary: '大论文撰写完成，资格审查资料准备' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '毕业冲刺', summary: '大论文完成，资格审查' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '毕业冲刺', summary: '大论文完成，资格审查' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '毕业冲刺', summary: '大论文第三章完成，资格审查资料准备' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '毕业冲刺', summary: '大论文第三章完成资格审查资料' }, // 2026.02.12
    { progress: 65, problems: 0, characterTag: '毕业准备', summary: '周子博本周科研工作毕业准备' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '毕业准备', summary: '周子博本周科研工作毕业准备' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '预答辩', summary: '周子博本周科研工作预答辩' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '论文冲刺', summary: '周子博本周科研工作论文冲刺' }, // 2026.03.27
  ],
  'd5': [
    { progress: 70, problems: 0, characterTag: '毕业论文', summary: '第六章（总结与展望）完成，第一章1.3.3之前完成' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '第一章全部内容完成，参考文献补充' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '第一章完成，初稿完成' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '第一章完成，初稿完成' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '第一章完成，初稿完成，3.1前修改' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '毕业论文', summary: '第一章完成初稿完成3.1前两轮修改3.16预答辩' }, // 2026.02.12
    { progress: 60, problems: 0, characterTag: '毕业准备', summary: '邓卉彤本周科研工作毕业准备' }, // 2026.03.06
    { progress: 65, problems: 0, characterTag: '毕业准备', summary: '邓卉彤本周科研工作毕业准备' }, // 2026.03.13
    { progress: 65, problems: 0, characterTag: '预答辩', summary: '邓卉彤本周科研工作预答辩' }, // 2026.03.20
    { progress: 60, problems: 0, characterTag: '论文修改', summary: '邓卉彤本周科研工作论文修改' }, // 2026.03.27
  ],
  'd9': [
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治结构透明有机太阳能电池文章撰写，钙钛矿/PEIE探测器器件制备测试' }, // 2026.01.09
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治结构电池正文完成，钙钛矿探测器文献调研和SEM表征' }, // 2026.01.16
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治电池正文完成，钙钛矿探测器调研表征' }, // 2026.01.23
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治电池正文完成，钙钛矿调研表征' }, // 2026.01.30
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治电池正文完成，钙钛矿探测器调研' }, // 2026.02.06
    { progress: 70, problems: 0, characterTag: '文章推进', summary: '三明治电池正文钙钛矿探测器调研表征' }, // 2026.02.12
    { progress: 60, problems: 0, characterTag: '器件制备', summary: '王启南本周科研工作器件制备' }, // 2026.03.06
    { progress: 65, problems: 0, characterTag: '器件优化', summary: '王启南本周科研工作器件优化' }, // 2026.03.13
    { progress: 65, problems: 0, characterTag: '器件优化', summary: '王启南本周科研工作器件优化' }, // 2026.03.20
    { progress: 65, problems: 0, characterTag: '器件优化', summary: '王启南本周科研工作器件优化' }, // 2026.03.27
  ],
  'd10': [
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull文章Fig2e补充实验，润湿恢复时间缩短至1h连续5组成功，冰刻间整改' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull文章补充实验完成，微接触角测试平台CCD更换，冰刻间年前关机' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull文章实验完成整理中，润湿实验CCD更换，冰刻间关机' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull实验完成，润湿CCD更换，冰刻间关机' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull补充实验完成，润湿CCD更换' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '文章冲刺', summary: 'Sci.Bull实验完成整理润湿CCD更换冰刻间关机' }, // 2026.02.12
    { progress: 60, problems: 0, characterTag: '文章投稿', summary: '欧阳祖希本周科研工作文章投稿' }, // 2026.03.06
    { progress: 65, problems: 0, characterTag: '文章投稿', summary: '欧阳祖希本周科研工作文章投稿' }, // 2026.03.13
    { progress: 65, problems: 0, characterTag: '应用探索', summary: '欧阳祖希本周科研工作应用探索' }, // 2026.03.20
    { progress: 70, problems: 0, characterTag: '应用推进', summary: '欧阳祖希本周科研工作应用推进' }, // 2026.03.27
  ],
  'd11': [
    { progress: 80, problems: 0, characterTag: '实验突破', summary: 'OTE衬底更换调研（SiO2→SiC），SiC衬底金片驱动成功，文章第三轮修改新增Fig4E/4F' }, // 2026.01.09
    { progress: 80, problems: 0, characterTag: '实验突破', summary: '辅助严老师PL理论解释，FIB加工面形貌分析，多种衬底金片驱动成功（SiC最优）' }, // 2026.01.16
    { progress: 80, problems: 0, characterTag: '多线并进', summary: '辅助PL理论解释，间隙面倾斜SEM，SiC衬底金片驱动，文章第三轮修改' }, // 2026.01.23
    { progress: 80, problems: 0, characterTag: '多线并进', summary: 'PL理论解释，SEM形貌分析，SiC衬底金片驱动，文章修改' }, // 2026.01.30
    { progress: 80, problems: 0, characterTag: '实验突破', summary: 'PL理论辅助，间隙面SEM，SiC衬底金片驱动成功' }, // 2026.02.06
    { progress: 80, problems: 0, characterTag: '实验突破', summary: 'PL理论辅助间隙面SEMSiC衬底金片驱动成功文章修改' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '实验推进', summary: '马墨南本周科研工作实验推进' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '马墨南本周科研工作实验推进' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '实验突破', summary: '马墨南本周科研工作实验突破' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '实验突破', summary: '马墨南本周科研工作实验突破' }, // 2026.03.27
  ],
  'd12': [
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜相位离散化验证不影响光场分布，ebl加工，void器件第二轮刻蚀，碳掩模工艺TiO2选择比测试' }, // 2026.01.09
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜ebl加工完成，void器件刻蚀完成寄出，专利交底书修改提交预审，键合剥离工艺' }, // 2026.01.16
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜ebl完成，void器件刻蚀寄出，专利提交预审，键合剥离工艺' }, // 2026.01.23
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜ebl完成，void器件寄出，专利预审，键合剥离' }, // 2026.01.30
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜ebl完成，void器件刻蚀寄出，专利预审，键合剥离' }, // 2026.02.06
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '金刚石超透镜ebl完成void器件刻蚀寄出专利预审键合剥离' }, // 2026.02.12
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '李晓萱本周科研工作多线并进' }, // 2026.03.06
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '李晓萱本周科研工作多线并进' }, // 2026.03.13
    { progress: 85, problems: 0, characterTag: '多线并进', summary: '李晓萱本周科研工作多线并进' }, // 2026.03.20
    { progress: 90, problems: 0, characterTag: '多线并进', summary: '李晓萱本周科研工作多线并进' }, // 2026.03.27
  ],
  'd14': [
    { progress: 70, problems: 1, characterTag: '制备推进', summary: '3mm口径消色差透镜灰度曝光，台阶仪测试结构高度20μm与设计一致，鲁汶ICP故障样品真空保存' }, // 2026.01.09
    { progress: 65, problems: 1, characterTag: '制备推进', summary: '上周曝光样品刻蚀完成（平台关停未测试），开题报告PPT撰写' }, // 2026.01.16
    { progress: 65, problems: 1, characterTag: '制备推进', summary: '曝光样品刻蚀完成（未测试），开题报告PPT' }, // 2026.01.23
    { progress: 65, problems: 1, characterTag: '制备推进', summary: '刻蚀完成未测试，开题PPT' }, // 2026.01.30
    { progress: 65, problems: 1, characterTag: '制备推进', summary: '刻蚀完成未测试（ICP故障），开题PPT' }, // 2026.02.06
    { progress: 65, problems: 1, characterTag: '制备推进', summary: '刻蚀完成未测试ICP故障开题PPT' }, // 2026.02.12
    { progress: 55, problems: 0, characterTag: '开题准备', summary: '章子鉴本周科研工作开题准备' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '开题准备', summary: '章子鉴本周科研工作开题准备' }, // 2026.03.13
    { progress: 70, problems: 0, characterTag: '开题答辩', summary: '章子鉴本周科研工作开题答辩' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '开题答辩', summary: '章子鉴本周科研工作开题答辩' }, // 2026.03.27
  ],
  'd16': [
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '低温扫描热20.2K测试验证，震动约40nm，铜胶带失效bonding线断' }, // 2026.01.09
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '扫描热样品台加热电阻选型设计，SPCM文章模拟改进，迷宫样品漏电解决但出现热电异质结' }, // 2026.01.16
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '加热电阻选型设计，SPCM模拟改进，迷宫热电异质结' }, // 2026.01.23
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '加热电阻选型，SPCM改进，迷宫热电异质结' }, // 2026.01.30
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '加热电阻选型，SPCM改进，迷宫热电异质结' }, // 2026.02.06
    { progress: 70, problems: 1, characterTag: '设备调试', summary: '加热电阻选型SPCM改进迷宫热电异质结' }, // 2026.02.12
    { progress: 70, problems: 0, characterTag: '设备开发', summary: '陈飞霖本周科研工作设备开发' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '设备开发', summary: '陈飞霖本周科研工作设备开发' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '设备突破', summary: '陈飞霖本周科研工作设备突破' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '设备推进', summary: '陈飞霖本周科研工作设备推进' }, // 2026.03.27
  ],
  'd18': [
    { progress: 75, problems: 0, characterTag: '样品制备', summary: '悬臂梁浸泡断裂问题解决，反射率测试达峰，与邵露青FIB腔结构工艺验证，角分辨测试年后安排' }, // 2026.01.09
    { progress: 75, problems: 0, characterTag: '仿真推进', summary: '仿真验证并行激光束分束结构可行性，倾斜光栅优化功率分配' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '仿真推进', summary: '并行激光束分束仿真，倾斜光栅功率优化' }, // 2026.01.23
    { progress: 75, problems: 0, characterTag: '仿真推进', summary: '分束仿真，倾斜光栅优化' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '仿真推进', summary: '分束仿真，倾斜光栅优化' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '仿真推进', summary: '分束仿真倾斜光栅优化' }, // 2026.02.12
    { progress: 80, problems: 0, characterTag: '仿真推进', summary: '虞阳本周科研工作仿真推进' }, // 2026.03.06
    { progress: 75, problems: 0, characterTag: '应用探索', summary: '虞阳本周科研工作应用探索' }, // 2026.03.13
    { progress: 80, problems: 0, characterTag: '测试准备', summary: '虞阳本周科研工作测试准备' }, // 2026.03.20
    { progress: 80, problems: 0, characterTag: '仿真优化', summary: '虞阳本周科研工作仿真优化' }, // 2026.03.27
  ],
  'x2': [
    { progress: 60, problems: 1, characterTag: '实验探索', summary: '8个衣藻样品光镜观察仅对照组存活，小电镜振动问题排查，硅藻镀膜，大电镜写场校准' }, // 2026.01.09
    { progress: 50, problems: 2, characterTag: '实验困难', summary: '小电镜镀膜拉杆头断裂无备件，硅藻金属膜剥离尝试失败（粘附不够），大电镜关机学习' }, // 2026.01.16
    { progress: 50, problems: 2, characterTag: '实验困难', summary: '小电镜拉杆断，硅藻剥离失败，大电镜关机学习' }, // 2026.01.23
    { progress: 50, problems: 2, characterTag: '实验困难', summary: '拉杆断，硅藻剥离失败，大电镜关机' }, // 2026.01.30
    { progress: 55, problems: 2, characterTag: '实验困难', summary: '衣藻仅对照组存活，小电镜振动，硅藻镀膜，大电镜校准' }, // 2026.02.06
    { progress: 50, problems: 2, characterTag: '实验困难', summary: '小电镜拉杆断硅藻剥离失败大电镜关机学习' }, // 2026.02.12
    { progress: 55, problems: 0, characterTag: '实验准备', summary: '王旭杰本周科研工作实验准备' }, // 2026.03.06
    { progress: 50, problems: 0, characterTag: '实验准备', summary: '王旭杰本周科研工作实验准备' }, // 2026.03.13
    { progress: 55, problems: 0, characterTag: '实验准备', summary: '王旭杰本周科研工作实验准备' }, // 2026.03.20
    { progress: 50, problems: 0, characterTag: '实验准备', summary: '王旭杰本周科研工作实验准备' }, // 2026.03.27
  ],
  'x3': [
    { progress: 70, problems: 0, characterTag: '本科论文', summary: '毕业论文根据陈老师建议调整结构，补充研究背景，增加多脉冲温度变化仿真图，完善参考文献格式' }, // 2026.05.09
    { progress: 70, problems: 0, characterTag: '本科论文', summary: '本科毕业论文撰写接近完成，下周和陈老师讨论细节并修改' }, // 2026.04.30
    { progress: 75, problems: 0, characterTag: '粘附力测试', summary: '钛合金氧化薄膜膜基结合力测试，氧化膜结合力较强，讨论改善粗糙度方案' }, // 2026.04.24
    { progress: 80, problems: 0, characterTag: '结构色优化', summary: '镜面/抛光面结构色制备效果大幅提升，确定50-250nm氧化膜参数，整理光谱数据' }, // 2026.04.17
    { progress: 80, problems: 0, characterTag: '结构色优化', summary: '镜面/抛光面结构色反射率大幅提升，确定多厚度参数，整理色域范围' }, // 2026.04.10
    { progress: 75, problems: 0, characterTag: '光谱测试', summary: '样品光谱测试确定厚度，最高250nm氧化膜，提交中期报告，推进毕业论文' }, // 2026.04.03
    { progress: 75, problems: 0, characterTag: '结构色制备', summary: '购置小型钛合金样品进行结构色加工，绘制飞秒/皮秒激光氧化差异图示' }, // 2026.03.20
    { progress: 75, problems: 0, characterTag: '结构色制备', summary: '小型钛合金样品结构色加工，反射光谱确认厚度，准备粘附力测试' }, // 2026.03.13
    { progress: 75, problems: 0, characterTag: '光谱测试', summary: '样品送深圳精加工切割导致氧化膜形变，学习论文作图，绘制氧化对比图' }, // 2026.03.06
    { progress: 70, problems: 0, characterTag: '论文综述', summary: '多脉冲氧化模型优化，皮秒vs纳秒氧化膜厚度计算，调研激光与材料作用' }, // 2026.02.12
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '补充拉曼和反射光谱测试，氧化膜光谱仿真倒推厚度，样品切割适配测试' }, // 2026.02.06
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '块体钛合金论文：补充光谱测试，仿真倒推氧化膜厚度，样品切割' }, // 2026.01.30
    { progress: 75, problems: 0, characterTag: '论文推进', summary: '块体钛合金论文：讨论写作思路分工，讨论厚度测量方案，校对结构色综述' }, // 2026.01.23
    { progress: 70, problems: 0, characterTag: '实验仿真', summary: '单脉冲多脉冲氧化实验，氧化膜厚度难测量，优化多脉冲模型，开题报告修改' }, // 2026.01.16
    { progress: 75, problems: 0, characterTag: '实验推进', summary: '单脉冲多脉冲氧化实验，调整仿真模型，修改开题报告格式为LaTeX' }, // 2026.01.09
  ],
  'x4': [
    { progress: 65, problems: 0, characterTag: '文献调研', summary: '与赵康讨论模拟结果，开始找研究原因和用法，看QBIC论文找故事' }, // 2026.05.09
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '周末考试，读周子博给的书，等赵康分析模拟结果' }, // 2026.04.30
    { progress: 65, problems: 0, characterTag: 'QBIC仿真', summary: '做黄金与SiO2/OICE的Chiral QBIC模拟，了解TOPV化学研究背景' }, // 2026.04.24
    { progress: 65, problems: 1, characterTag: 'QBIC仿真', summary: 'nanorod QBIC模拟，结果与论文不一致需找差别，找OICE nanorod共振波长' }, // 2026.04.17
    { progress: 70, problems: 0, characterTag: 'QBIC设计', summary: '冰刻制造QBIC结构设计，nanorods在光纤和SiO2晶圆上，准备模拟' }, // 2026.04.10
    { progress: 65, problems: 1, characterTag: '模拟复现', summary: '复现Kühner/Hu/Chen三篇论文模拟，Kühner结果不一致，学习TOPV文献' }, // 2026.04.03
    { progress: 45, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习，基础实验技能训练' }, // 2026.03.27
    { progress: 45, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习，基础实验技能训练' }, // 2026.03.20
    { progress: 45, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习，基础实验技能训练' }, // 2026.03.13
    { progress: 45, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习，基础实验技能训练' }, // 2026.03.06
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '春节假期，光电子学理论学习' }, // 2026.02.12
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '春节假期，光电子学理论学习' }, // 2026.02.06
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习' }, // 2026.01.30
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习' }, // 2026.01.23
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习' }, // 2026.01.16
    { progress: 50, problems: 0, characterTag: '理论学习', summary: '光电子学理论学习' }, // 2026.01.09
  ],
};

export function getPersonTrend(personId: string): WeekTrend[] {
  return PERSON_BASELINE_TRENDS[personId] || [];
}

export function getTrendByPersonId(personId: string, personName?: string): import('../types').PersonTrend {
  const trends = getPersonTrend(personId);
  const data = trends.map((t, i) => ({
    weekNumber: i + 1,
    weekLabel: TREND_LABELS[i] || '',
    workloadScore: t.progress,
    progressScore: t.progress,
    problemCount: t.problems,
    overallScore: Math.round(t.progress / 10),
    isAnomaly: t.progress < 50 || t.problems >= 2,
    anomalyReason: t.problems >= 2 ? '实验困难较多' : t.progress < 50 ? '进展偏慢需关注' : undefined,
  }));
  return {
    personId,
    personName: personName || personId,
    data,
  };
}

/** 获取合并后的趋势数据（静态基线 + 动态上传数据），用于 PDF 报告等 */
export function getMergedTrendByPersonId(
  personId: string,
  personName?: string
): import('../types').PersonTrend {
  // 尝试从 dynamicStorage 获取合并数据
  let labels = TREND_LABELS;
  let trends: WeekTrend[] = getPersonTrend(personId);

  try {
    // 使用 dynamicStorage 的 getMergedPersonTrend
    const dynStr = localStorage.getItem('qlab_dynamic_trends') || '{}';
    const dynLabels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
    const dynamicTrends = JSON.parse(dynStr) as Record<string, Record<string, WeekTrend>>;

    // 合并静态标签和动态标签
    const allLabels = [...new Set([...TREND_LABELS, ...dynLabels])].sort();
    labels = allLabels;

    // 为每个标签构建趋势数据
    const mergedTrends: WeekTrend[] = [];
    for (const label of allLabels) {
      const dynWeek = dynamicTrends[label];
      const dynTrend = dynWeek?.[personId] || dynWeek?.[personName || ''];
      if (dynTrend) {
        mergedTrends.push(dynTrend);
      } else {
        const staticIdx = TREND_LABELS.indexOf(label);
        if (staticIdx >= 0) {
          mergedTrends.push(
            PERSON_BASELINE_TRENDS[personId]?.[staticIdx] ?? {
              progress: 70, problems: 0, characterTag: '持续推进', summary: '持续推进科研工作',
            }
          );
        }
      }
    }
    trends = mergedTrends;
  } catch {
    // localStorage 不可用，使用静态数据
  }

  const data = trends.map((t, i) => ({
    weekNumber: i + 1,
    weekLabel: labels[i] || '',
    workloadScore: t.progress,
    progressScore: t.progress,
    problemCount: t.problems,
    overallScore: Math.round(t.progress / 10),
    isAnomaly: t.progress < 50 || t.problems >= 2,
    anomalyReason: t.problems >= 2 ? '实验困难较多' : t.progress < 50 ? '进展偏慢需关注' : undefined,
  }));
  return {
    personId,
    personName: personName || personId,
    data,
  };
}
