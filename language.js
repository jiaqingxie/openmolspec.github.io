(() => {
  'use strict';
  const phrases = {
    'OpenMolSpec · Molecular data, spectra and tools':'OpenMolSpec · 分子光谱数据与工具',
    'Skip to content':'跳到正文','OpenMolSpec home':'OpenMolSpec 首页','Open navigation':'展开导航','Main navigation':'主导航',
    'Benchmarks':'评测','Workspace':'工作台','Explore':'数据探索','Datasets':'数据集','Documentation':'使用文档','Agent Harness':'Agent Harness 智能体',
    'From structure':'从分子结构','to':'到','spectra.':'光谱。','Open workspace':'打开工作台','Assign these HSQC peaks':'指认这组 HSQC 交叉峰',
    'Predict molecular spectra, assign experimental peaks and explore the data behind each model.':'预测分子光谱、指认实验峰，查看各模型所用的数据。',
    'Experimental H/C spectra':'实验氢谱与碳谱','Unique H/C molecules':'氢谱与碳谱去重分子','Documented tasks':'有指南的谱学任务','Online workflows':'验证过的在线工作流','Executed tutorials':'已运行教程',
    'Spectroscopy workspace':'谱学工作台','Start with what you have: a structure, measured peaks or a set of spectra. Each workflow lists its inputs and the result you can expect.':'从手边的数据开始。选择分子结构、实测峰表或多谱工作流，即可查看所需输入与返回结果。',
    'Choose a task':'选择任务','Checking service…':'正在检查模型服务…','Model service connected':'模型服务已连接','Connecting model service…':'正在连接模型服务…','Model service is reconnecting':'正在重新连接模型服务',
    'Structure → spectra':'结构 → 光谱','NMR → structure':'核磁谱 → 结构','HSQC prediction / assignment':'HSQC 预测与指认','Solvent transfer':'跨溶剂位移','Spectra → gap':'光谱 → 能隙','Multimodal → structure':'多谱 → 结构',
    'Which spectrum should this structure produce?':'这个分子会产生怎样的光谱？','Molecular SMILES and the spectrum type. MS/MS also needs acquisition conditions.':'分子 SMILES 和谱种。预测串联质谱还需提供采集条件。','NMR shifts in ppm, an MS/MS peak list, or IR and Raman intensity curves.':'NMR 化学位移（ppm）、MS/MS 峰表，或 IR 与拉曼强度曲线。',
    'Which structures fit my measured NMR peaks?':'哪些分子结构符合实测核磁峰？','¹H and ¹³C peak lists. Supply a candidate library to search, or a formula to generate structures.':'提供 ¹H、¹³C 峰表。输入候选库可检索结构，输入分子式可生成候选。','Ranked molecular structures, with SMILES and model scores.':'按模型分数排序的候选结构及 SMILES。',
    'Which carbon is associated with each C–H cross-peak?':'每个碳氢交叉峰对应哪个碳原子？','Known SMILES and solvent. Add measured (¹³C, ¹H) pairs to request assignments.':'已知分子 SMILES 和溶剂。输入实测的（¹³C，¹H）峰对即可进行指认。','Predicted cross-peaks and carbon indices, with a measured/predicted overlay for assignment.':'预测交叉峰及碳原子编号。提供实测峰后可查看匹配和叠图。',
    'How might this shift change in another solvent?':'换溶剂后，化学位移可能改变多少？','SMILES, nucleus, measured shift, source solvent and target solvent.':'输入 SMILES、核种、实测位移、原溶剂及目标溶剂。','An estimated target shift and the paired experimental reference used for the estimate.':'返回目标位移估计值和计算所用的配对实验参考。',
    'What energy gap is consistent with my four spectra?':'这组四谱对应多大的能隙？','IR and Raman arrays plus ¹H and ¹³C shifts, as a four-channel JSON file.':'以四通道 JSON 输入 IR、拉曼数组及 ¹H、¹³C 位移。','A predicted HOMO–LUMO energy gap in electronvolts.':'预测的 HOMO–LUMO 能隙，单位为 eV。',
    'Which structures fit all four spectra?':'哪些分子结构能同时解释四种谱？','IR, Raman, ¹H and ¹³C data. Add candidate SMILES for library ranking.':'输入 IR、拉曼、¹H 和 ¹³C 数据。进行库内排序时另提供候选 SMILES。','Generated structures or a ranked candidate list.':'生成的结构或排序后的候选列表。',
    'Can an agent run a spectroscopy workflow for me?':'如何让智能体调用谱学工具？','A question with a SMILES or spectral peaks and the task you want to run.':'输入问题、SMILES 或峰表，并说明希望执行的任务。','An answer with model results and an inspectable record of MCP tool calls.':'返回模型结果、问题解答及可展开的 MCP 调用记录。',
    'Input':'输入','Output':'输出','Model tools':'模型工具','Molecular input':'分子输入','Begin with a structure.':'从分子结构开始。','Enter a molecular SMILES and choose the spectroscopy task.':'输入分子 SMILES 并选择任务。','Example SMILES':'示例 SMILES','A place for your result.':'结果预览','Model output, spectra and numerical values will appear here when the workflow is ready.':'运行后在此查看光谱及数值。',
    'Start with a molecular structure':'输入分子结构','Task':'任务','Predict ¹³C NMR':'预测 ¹³C 核磁谱','Predict ¹H NMR':'预测 ¹H 核磁谱','Assign measured ¹³C peaks':'指认实测 ¹³C 峰','Predict IR and Raman from a conformer':'由构象预测 IR 与拉曼谱','Predict MS/MS · GLACIER':'预测 MS/MS · GLACIER','Predict MS/MS · ICEBERG':'预测 MS/MS · ICEBERG',
    'Observed ¹³C peaks / ppm':'实测 ¹³C 峰 / ppm','IR/Raman reference convention':'IR/拉曼参考设置','NMR solvent (optional)':'核磁溶剂（可选）','Adduct':'加合离子','Collision energy (checkpoint convention)':'碰撞能量（按模型约定）','Instrument category':'仪器类型','Specify the acquisition conditions for your spectrum. The defaults are an example, and are not inferred from SMILES.':'请填写实验采集条件。默认值为示例条件。',
    'Run model':'运行模型','Use example':'使用示例','Chemical shifts are returned in ppm with atom indices. MS/MS returns m/z and relative intensity. IR/Raman use the generated molecular conformer.':'化学位移以 ppm 和原子编号表示。MS/MS 返回质荷比和相对强度。IR 和拉曼使用生成的分子构象。',
    'Recorded example · NMRNet++ (five folds)':'已保存示例 · NMRNet++（五折）','Ethanol ¹³C shifts':'乙醇 ¹³C 化学位移','Your model output will appear here.':'运行后在此查看结果。',
    'Browse the full task catalog':'查看完整任务目录','Task guide':'任务指南','Learn the input fields and model settings in the':'输入字段和模型设置详见','task guides':'任务指南',
    'Why does ethanol have two ¹³C signals and dimethyl ether one?':'为什么乙醇有两个 ¹³C 信号，而二甲醚只有一个？','Two structures, one formula':'同一分子式，两种结构',
    'Ethanol has two distinct carbon environments. The two methyl groups in dimethyl ether are equivalent. Select an isomer and send its structure to the ¹³C predictor to inspect the shifts.':'乙醇的两个碳处于不同化学环境，二甲醚的两个甲基等价。选择异构体可将其结构送入 ¹³C 预测器，查看各碳的位移。',
    'Ethanol':'乙醇','Dimethyl ether':'二甲醚','Carbon':'碳','Hydrogen':'氢','Oxygen':'氧','Predict this ¹³C spectrum ↗':'预测此结构的 ¹³C 谱 ↗','Ethanol · CCO · Two distinct carbon environments.':'乙醇 · CCO · 两种碳环境。','Dimethyl ether · COC · One carbon environment by symmetry.':'二甲醚 · COC · 两个碳对称等价，只有一种碳环境。',
    'Explore spectra':'探索光谱','Browse measured spectra, find a molecule by SMILES and compare experimental peaks with calculated values.':'浏览实测谱、按 SMILES 查找分子，比较实验峰与计算结果。','Experimental coverage':'实验谱数据看板','Recorded spectra in the cleaned OpenMolSpec collection. Select a channel to inspect sample records.':'统计清洗入库的实测光谱数量。选择通道可查看对应视图的样本记录。','Other NMR nuclei':'其他核种','IR, Raman & MS':'红外、拉曼与质谱','Experimental records':'实验记录','Dataset sizes and sources ↓':'数据规模与来源 ↓',
    'Dataset':'数据集','Find a record':'搜索记录','SMILES, formula or nucleus…':'输入 SMILES、分子式或核种…','Loading preview…':'正在加载预览…','Records':'记录','Loading molecular records…':'正在加载分子记录…','A molecule and its spectrum.':'分子与光谱','Select a record to view its structure, spectrum and experimental metadata.':'选择记录以查看结构、光谱和实验条件。','All spectroscopy datasets':'全部谱学数据集','All spectra':'全部光谱','Mass spectrometry':'质谱','Infrared':'红外','Raman':'拉曼','Boron NMR':'硼谱','Fluorine NMR':'氟谱','Silicon NMR':'硅谱','Phosphorus NMR':'磷谱','Download record':'下载记录','Use this structure':'使用此结构','Inspect record fields':'查看记录字段','No records match this filter.':'没有符合条件的记录。',
    'Experimental · External dataset':'实验谱 · 外部数据集','Expert-annotated C–H cross-peaks with original molecular structures and atom indices.':'专家标注的碳氢交叉峰，含原始分子结构及原子编号。','Test spectra':'测试谱图','Distinct molecules':'去重分子','Assigned carbon rows':'已标注碳记录','Author test data ↗':'作者测试数据 ↗','Assign HSQC peaks ↗':'指认 HSQC 峰 ↗','Dataset sizes and sources':'各数据集规模与来源','Spectra and molecules, counted separately':'分别统计谱数与分子数','Dataset / view':'数据集 / 视图','Category':'类别','Description':'说明','Spectra':'谱数','Molecules':'分子数','Counts describe each selected dataset view. See the data guide for source information, fields and train/test splits.':'各视图独立统计。来源、字段及训练/测试划分详见数据指南。','Explore dataset fields and access':'查看数据字段与访问方式',
    'Scientific examples and figures':'科研案例与图表','Selected examples':'精选案例','Gallery':'图集','All':'全部','Multimodal':'多谱','Data':'数据','Inputs, outputs and source →':'输入、输出与数据来源 →','Structure elucidation from NMR':'利用核磁谱解析结构','Predicting tandem mass spectra':'串联质谱预测','IR and Raman from a molecular geometry':'由分子几何预测红外与拉曼谱','Predicting the HOMO–LUMO gap':'HOMO–LUMO 能隙预测',
    'The top-ranked structure matches the reference molecule in this H/C NMR example.':'该氢碳谱示例中，排名第一的结构与参考分子相符。','GLACIER predictions compared with 14 measured peaks: cosine similarity 0.869; entropy similarity 0.796.':'GLACIER 与 14 个实测峰的余弦相似度为 0.869，熵相似度为 0.796。','Use the openSpec model to predict IR and Raman spectra from atomic coordinates.':'使用 openSpec 根据原子坐标预测红外与拉曼谱。','Combine IR, Raman and NMR spectra to predict the energy gap in eV.':'结合红外、拉曼及核磁谱预测能隙（eV）。',
    'Follow an executed tutorial, explore a dataset schema, or bring OpenMolSpec into your Python and agent workflows.':'阅读已执行的教程，查看数据集字段，或在 Python 和智能体工作流中调用 OpenMolSpec。','Quick start':'快速入门','Installation, your first spectrum and model calls.':'安装、读取第一张谱和调用模型。','Data guide':'数据指南','Fields, sources, distributions and dataset splits.':'字段、来源、分布与数据划分。','Python API':'Python 接口','Dataset readers, model interfaces and training.':'数据读取、模型接口与训练。','Python, CLI and MCP tools for scientific agents.':'供科研智能体使用的 Python、CLI 和 MCP 工具。','Read the full documentation':'阅读完整使用手册','Data and tools for molecular spectroscopy.':'分子谱学数据与工具。','Close':'关闭','Open tutorial':'打开教程',
    'Search or generate a structure from NMR':'用核磁谱检索或生成结构','Workflow':'工作流','Rank candidate structures':'对候选结构排序','Generate from a known formula':'根据已知分子式生成','¹H chemical shifts / ppm':'¹H 化学位移 / ppm','¹³C chemical shifts / ppm':'¹³C 化学位移 / ppm','Molecular formula':'分子式','Candidate SMILES, one per line (2–32)':'候选 SMILES，每行一个（2–32 个）','Load a measured example':'载入实测案例','Run NMR model':'运行核磁模型','Enter measured shifts for both nuclei.':'请输入两种核的实测位移。','Structure generation requires a molecular formula.':'生成结构需要分子式。','Enter 2–32 candidate SMILES.':'请输入 2–32 个候选 SMILES。',
    'Predict HSQC cross-peaks':'预测 HSQC 交叉峰','Known molecular SMILES':'已知分子的 SMILES','Solvent class':'溶剂类别','Measured peaks for assignment (optional), ¹³C ppm then ¹H ppm':'实测峰对（指认可选），先填 ¹³C，再填 ¹H，单位 ppm','Enter one C,H pair per line, or load an annotation CSV':'每行输入一组 C,H 峰，或导入标注 CSV','Load butanenitrile example':'载入丁腈示例','Butanenitrile in CDCl3, spectrum 32869.':'氘代氯仿中的丁腈，谱图编号 32869。','Loaded sucrose in D₂O · BMRB bmse000119.':'已载入重水中的蔗糖 · BMRB bmse000119。','HSQC task guide':'HSQC 任务指南','simpleNMR worked assignment':'simpleNMR 指认案例','Run TransPeakNet':'运行 TransPeakNet','Enter the known molecular SMILES.':'请输入已知结构的 SMILES。','Enter measured carbon–proton shift pairs.':'请输入实测碳氢峰对。','Enter measured ¹³C and ¹H ppm pairs.':'请输入以 ppm 表示的 ¹³C 和 ¹H 位移对。',
    'Estimate shifts across solvents':'估算跨溶剂位移','Nucleus':'核种','Source solvent':'原溶剂','Target solvent':'目标溶剂','Observed shift in the source solvent / ppm':'原溶剂中的实测位移 / ppm','This reference baseline uses an independently measured shift change for the selected solvent pair.':'参考基线采用该溶剂对独立测量的化学位移变化。','Estimate target shift':'估算目标位移','Enter an observed shift.':'请输入实测位移。',
    'Predict a molecular energy gap':'预测分子能隙','Generate or rank molecular structures':'生成分子结构或给候选排序','Use IR, Raman and H/C NMR together. Load the recorded four-channel example or import your own JSON.':'联合输入 IR、拉曼、氢谱和碳谱，可载入四谱案例或导入 JSON。','Inspect or edit numerical inputs':'查看或编辑输入数值','Load a real spectral example':'载入真实光谱案例','IR: 1,024 points · Raman: 1,024 points · H/C shifts loaded':'红外 1,024 点 · 拉曼 1,024 点 · 已载入氢碳位移','Your spectral file is loaded':'已载入光谱文件','Choose a JSON file with ir, raman, nmr_h and nmr_c arrays.':'请选择包含 ir、raman、nmr_h、nmr_c 数组的 JSON。','The example is a recorded computed IR/Raman/H/C benchmark input. It is separate from the experimental dataset previews below.':'示例来自计算谱基准，包含红外、拉曼及氢碳位移。实测谱可在数据区查看。','Load an example or import a JSON file.':'载入案例或导入 JSON 文件。','Generate molecular candidates':'生成候选分子','Rank a candidate list':'对候选列表排序','Candidate SMILES, one per line':'候选 SMILES，每行一个','Predict gap':'预测能隙','Run structure model':'运行结构模型','Load the example or enter valid spectral JSON.':'请载入示例或输入有效的光谱 JSON。',
    'Ask the spectroscopy agent':'向谱学智能体提问','Watch the agent discover tools, validate your inputs, call a model and explain its output.':'查看智能体如何查找工具、验证输入、调用模型并解释输出。','Your question':'你的问题','Predict the ¹³C NMR shifts of ethanol (CCO).':'预测乙醇（CCO）的 ¹³C 化学位移。','Validate CCO and assign measured carbon peaks at 18.2 and 58.3 ppm.':'验证 CCO 并指认 18.2 和 58.3 ppm 的实测碳峰。','List available tools, validate ethanol (CCO), then predict its ¹³C shifts with atom indices and ppm values.':'请列出可用工具，验证乙醇（CCO）的输入，预测其 ¹³C 位移并列出原子编号和 ppm 值。','Run Agent Harness':'运行智能体','Model API → MCP tool discovery → input validation → model execution. Expand each tool call to inspect its input and output.':'模型 API → MCP 工具发现 → 输入验证 → 模型执行。展开调用可查看输入与输出。',
    'Submitting your request…':'正在提交请求…','Open this run':'打开该次运行','Reconnecting to the submitted run…':'正在重新连接已提交的任务…','Download result and trace':'下载结果和调用记录','The agent is offline. The spectroscopy tools are available.':'智能体服务离线，可直接使用谱学工具。','This workflow is temporarily unavailable on the model service.':'模型服务暂时无法执行该工作流。','The model service is not configured.':'尚未配置模型服务。','The service could not complete this request':'服务未能完成请求','The run is still processing. Keep its run ID to continue later.':'任务仍在处理中。可保存运行编号，稍后查看。','The model service could not be reached.':'无法连接模型服务。','Failed to fetch':'连接失败','Model execution failed':'模型运行失败','Could not load the sucrose record.':'无法加载蔗糖记录。','None of these structures fit?':'候选结构都不合适？','Generate new structures from the same ¹H and ¹³C spectra. Enter the molecular formula from your experiment.':'输入实验得到的分子式，使用这组氢谱和碳谱生成新结构。','Generate alternatives':'生成其他候选','Enter a molecular formula.':'请输入分子式。',
    'Molecular candidates':'候选分子','Rank':'排名','Model score':'模型得分','Atom index':'原子编号','Atom indices':'原子编号','Carbon atom indices':'碳原子编号','Attached heavy-atom indices':'相连重原子编号','Predicted peak / ppm':'预测峰 / ppm','Predicted shift / ppm':'预测位移 / ppm','Candidate peak-to-atom assignments':'候选峰–原子指认','Observed / ppm':'实测 / ppm','Predicted / ppm':'预测 / ppm','Difference / ppm':'差值 / ppm','Predicted HSQC cross-peaks':'预测 HSQC 交叉峰','TransPeakNet HSQC peak assignment':'TransPeakNet HSQC 峰指认','Filled dots: measured. Outlined dots: predicted.':'实心点为实测峰，空心点为预测峰。','Peak':'峰','C atom index':'碳原子编号','C atom index (zero based)':'碳原子编号（从零起）','Observed C':'实测碳','Observed H':'实测氢','Predicted C':'预测碳','Predicted H':'预测氢','Cross-solvent reference estimate':'跨溶剂参考估计','Predicted MS/MS':'预测 MS/MS','Predicted HOMO–LUMO gap':'预测 HOMO–LUMO 能隙','Predicted energy gap':'预测能隙','Tool input':'工具输入','Tool output':'工具输出','running':'运行中','completed':'已完成','Connecting the model and spectroscopy tools…':'正在连接模型与谱学工具…',
    'Atom indices start at zero in the input SMILES. Each row groups equivalent atoms of the selected nucleus.':'原子编号从零开始。每行表示所选核种的一组等价原子。','Ranking covers the candidate SMILES you supplied.':'排序范围为输入的候选 SMILES。','Scores rank candidates within this request. Verify candidates against the experimental spectra.':'分数用于本次候选排序。请结合实测谱验证。'
  };
  Object.assign(phrases, JSON.parse(document.getElementById('task-titles-zh')?.textContent || '{}'), {
    'Molecular structure; nucleus':'分子结构、核种','Atom-indexed shifts (ppm)':'按原子编号的位移（ppm）','Known structure and solvent':'已知结构与溶剂','Carbon-indexed HSQC cross-peaks (ppm)':'按碳编号的 HSQC 交叉峰（ppm）','Known structure; observed H/C peaks':'已知结构、实测氢碳峰','Structure; source shifts; solvent pair':'结构、原溶剂位移、溶剂对','Target shifts and reference provenance':'目标溶剂位移与参考来源','Molecular structure; candidate spectra':'分子结构、候选谱','Ranked spectra':'排序后的候选谱','NMR peaks; candidate structures':'核磁峰、候选结构','Ranked molecular structures':'排序后的分子结构','NMR peaks; supplied molecular formula':'核磁峰、给定分子式','SMILES candidates':'候选 SMILES','Structure; adduct; collision energy; instrument':'结构、加合离子、碰撞能量、仪器','MS/MS m/z–intensity peaks':'MS/MS 质荷比–强度峰表','Structure; MS/MS peaks; precursor conditions':'结构、MS/MS 峰表、前体离子条件','Candidate fragment annotations':'候选碎片指认','Elements and 3D Cartesian coordinates':'元素与三维笛卡尔坐标','IR and Raman spectra':'红外与拉曼谱','HOMO–LUMO gap (eV)':'HOMO–LUMO 能隙（eV）',
    'Experimental · OpenMolSpec collection':'实测 · OpenMolSpec 清洗合集','Experimental · external':'实测 · 外部数据','Computed · external':'计算 · 外部数据','Computed · OpenMolSpec benchmark':'计算 · OpenMolSpec 基准',
    'Experimental proton and carbon chemical shifts':'实测氢碳化学位移','Cleaned H/C NMR molecular distributions':'清洗后氢碳谱的分子分布','Cleaned experimental spectra by nucleus and modality':'清洗后各核种与谱种的实验谱分布','Experimental mass spectra and molecular distributions':'实验质谱与分子分布','Experimental IR and Raman peak distributions':'实验红外与拉曼峰分布',
    'OpenDataLab · H/C NMR':'OpenDataLab · 氢碳核磁谱','TransPeakNet · HSQC test set':'TransPeakNet · HSQC 测试集','OpenMolSpec · computed test view':'OpenMolSpec · 计算谱测试视图','MassSpecGym v1.5 · prediction view':'MassSpecGym v1.5 · 预测视图','MassBank · MS2 view':'MassBank · MS2 视图','QMe14S · paired IR/Raman view':'QMe14S · 配对红外/拉曼视图','Expert-annotated 2D C–H cross-peaks. The authors provide training and validation spectra upon request.':'专家标注的二维碳氢交叉峰，训练和验证谱可向原作者申请。','IR/Raman spectra for 20,390 calculation records, with H/C shifts, structures and electronic properties.':'20,390 条计算记录的红外与拉曼谱，附氢碳位移、结构和电子性质。','Tandem mass spectra paired with molecular structures and acquisition conditions for forward prediction.':'用于正向预测的串联质谱，含分子结构与采集条件。','Numerical tandem mass spectra with parseable molecular structures and repository acquisition metadata.':'数值串联质谱，含可解析结构与采集元数据。','184,252 finite, nonconstant infrared/Raman pairs across 14 elements; each channel counts as one spectrum.':'涵盖 14 种元素的 184,252 组有效红外/拉曼谱对，每个通道计一张谱。',
    'Measured infrared peak positions in cm⁻¹, paired with standardized molecular structures.':'实测红外峰位（cm⁻¹）及标准化分子结构。','Measured Raman peak positions in cm⁻¹ and source experimental metadata.':'实测拉曼峰位（cm⁻¹）及原始实验元数据。','Measured m/z–intensity peak lists paired with standardized molecular structures.':'实测质荷比–强度峰表及标准化分子结构。',
    'Model tools and agent online':'模型工具与智能体已连接','Model tools online · live agent offline':'模型工具在线 · 实时智能体离线','A live agent needs a connected model provider.':'实时智能体需要连接模型提供方。','Live questions require a connected model provider. You can explore the recorded Harness cases below.':'实时提问需要服务端接入模型提供方。可在下方浏览已记录的智能体案例。',
    'Spectral channels':'光谱通道','Spectral input JSON':'光谱输入 JSON','What molecular energy gap do the spectra predict?':'这组谱预测的分子能隙是多少？','IR, Raman, both channels, or the full set with ¹H and ¹³C shifts.':'选择红外、拉曼、两者组合，或再加入氢碳位移的全四谱。','Which structures fit my spectra?':'哪些结构能解释现有光谱？','Choose the available channels. For retrieval or reranking, also provide a candidate SMILES list.':'选择已有谱种。检索或重排还需提供候选 SMILES。','Rerank a candidate shortlist':'对候选短名单重排','The example comes from a computed IR/Raman/H/C benchmark. Only the selected channels are sent to the model.':'示例来自计算谱基准，执行时仅发送所选通道的数据。','Enter at least two candidate SMILES.':'请至少输入两个候选 SMILES。',
    'Browse benchmarks ↗':'查看完整评测 ↗','Four-spectrum retrieval':'四谱结构检索','Assign measured ¹H or ¹³C peaks':'指认实测 ¹H 或 ¹³C 峰','Measured peaks / ppm':'实测峰 / ppm','Estimated target shift':'目标溶剂位移估计','An estimated target shift, its change in ppm and the estimation method.':'预测目标位移、位移变化及估算方法。','The result identifies the fitted solvent model or paired experimental reference used for your inputs.':'结果标明所用的拟合模型或配对实验参考。','Spectrum text and a question':'光谱文本与问题','Model answer':'模型回答','Multispectral text prompt':'多谱文本输入','Reranked molecular structures':'重排后的分子结构',
    'Browse benchmarks':'查看评测','Benchmark results':'基准评测','Held-out evaluation':'留出集评测','Input and output':'输入与输出','Exact answers':'答案完全匹配','Four-channel energy gap':'四谱能隙','¹H peak-to-atom accuracy':'¹H 峰到原子指认准确率','¹³C peak-to-atom accuracy':'¹³C 峰到原子指认准确率','SpecMol question answering':'SpecMol 谱学问答','Mean absolute error':'平均绝对误差',
    'Scientific tool workspace':'谱学工作台','Choose a spectroscopy workflow':'选择谱学工作流','Scientific examples and figure gallery':'科研示例与图集','Filter scientific figures':'按类别过滤科研图表','Selected molecular record':'所选分子记录','Dataset preview records':'数据集样例记录','Choose an isomer':'选择异构体','Scientific figure':'科研图表','Close scientific figure':'关闭图表','Import HSQC peak list':'导入 HSQC 峰表','Import spectral JSON':'导入光谱 JSON','Four-channel spectral input JSON':'四通道光谱输入 JSON','HSQC cross-peaks, observed and predicted':'实测与预测 HSQC 交叉峰','Interactive ball-and-stick structure. Drag the orange oxygen to reconnect the atoms.':'交互式球棍结构。拖动橙色氧原子可切换连接方式。'
  });
  const elements={phosphorus:'磷',boron:'硼',silicon:'硅',fluorine:'氟'};
  const compounds={'triethyl phosphate':'磷酸三乙酯','phenylboronic acid':'苯硼酸',tetramethylsilane:'四甲基硅烷',fluorobenzene:'氟苯'};
  function chinese(value) {
    if(Object.hasOwn(phrases,value)) return phrases[value];
    const rules = [
      [/^Combined peak list from (\d+) acquisitions\.$/,(_,n)=>'合并 '+n+' 次采集的峰表。'],
      [/^Missing spectral input: (.+)$/,(_,n)=>'缺少光谱输入：'+n],
      [/^MAE · ([\d,]+) computed molecules$/,(_,n)=>'平均绝对误差 · '+n+' 个计算谱分子'],
      [/^Top 1 · ([\d,]+) candidates · top-(\d+) reranked$/,(_,n,k)=>'首位命中 · '+n+' 个候选 · 前 '+k+' 重排'],
      [/^Exact answers · (\d+) held-out questions$/,(_,n)=>'答案完全匹配 · '+n+' 道测试题'],
      [/^Predict (.+) solution NMR$/,(_,n)=>'预测 '+n+' 溶液核磁谱'],
      [/^Enter a SMILES containing (\w+)\. Equivalent sites share a predicted shift\.$/,(_,e)=>'请输入含'+(elements[e]||e)+'的 SMILES。等价位点共享预测位移。'],
      [/^Use (.+) example$/,(_,n)=>'使用'+(compounds[n]||n)+'示例'],
      [/^(.+) model and accuracy$/,(_,n)=>n+' 模型及精度'],
      [/^(.+) · (\d+) peaks$/,(_,n,k)=>n+' · '+k+' 个峰'],
      [/^(.+) · experimental$/,(_,n)=>n+' · 实测'],
      [/^(.+) · (peak positions|normalized intensity)$/,(_,n,t)=>n+(t==='peak positions'?' · 峰位':' · 归一化强度')],
      [/^(\d+) real preview records across (\d+) experimental views$/,(_,n,k)=>k+' 个实验视图，共 '+n+' 条预览记录'],
      [/^(\d+) real preview records · ([\d,]+) spectra \/ ([\d,]+) molecules$/,(_,n,s,m)=>n+' 条预览记录 · 该视图共 '+s+' 张谱，'+m+' 个分子'],
      [/^(\d+) figures from recorded model runs and data summaries$/,(_,n)=>n+' 张来自模型运行与数据统计的图表'],
      [/^(.+) · Example (\d+)$/,(_,t,n)=>chinese(t)+' · 示例 '+n],
      [/^(Boron|Fluorine|Silicon|Phosphorus) chemical shifts in ppm with .+ molecular structures\.$/,(_,e)=>(elements[e.toLowerCase()]||e)+'化学位移（ppm）及相应分子结构。'],
      [/^(.+); candidate structures$/,(_,t)=>t+'、候选结构'],
      [/^(.+) (solution chemical shifts|chemical shifts)$/,(_,n)=>n+' 化学位移'],
      [/^(.+) atom indices$/,(_,n)=>n+' 原子编号'],
      [/^([¹³H¹C]+) chemical shift \/ ppm$/,(_,n)=>n+' 化学位移 / ppm'],
      [/^([\d,]+) labeled peaks$/,(_,n)=>n+' 个标注峰'],
      [/^([\d,]+) computed molecules$/,(_,n)=>n+' 个计算谱分子'],
      [/^(\d+) held-out questions$/,(_,n)=>n+' 个测试问题'],
      [/^Molecular structure for (.+)$/,(_,n)=>n+' 的分子结构'],
      [/^(Solvent: |Frequency: |Source: )/,()=>value.replace('Solvent: ','溶剂：').replace('Frequency: ','频率：').replace('Source: ','来源：')],
    ];
    for(const [pattern,format] of rules) {const match=value.match(pattern);if(match)return format(...match);}
    return value;
  }
  const excluded='#language-switch,#molecular-specimen,#explore-lab,#harness-showcase,script,style,code,pre,textarea,.agent-answer,[data-raw]';
  const originals=new WeakMap();
  const attrs=['placeholder','aria-label','title','alt'];
  const url=new URL(location.href);
  let stored;
  try {stored=localStorage.getItem('oms-language');} catch {}
  function language(code){return /^zh(?:-|$)/i.test(code||'')?'zh-Hans':'en';}
  let lang=language(url.searchParams.get('lang')||stored);
  const translate=value=>lang==='en'?value:chinese(value);
  window.omsTranslate=translate;
  function translateValue(node,key,current,write) {
    if(!current)return;
    const cache=originals.get(node)||new Map();
    const entry=cache.get(key);
    const original=entry&&current===entry.shown?entry.original:current;
    let shown;
    if(key==='href') {
      if(node.hasAttribute('hreflang')||!/^docs\/(?!zh\/)/.test(original))return;
      shown=lang==='en'?original:original.replace(/^docs\//,'docs/zh/');
    } else {
      const trimmed=original.trim();
      if(!trimmed)return;
      shown=original.replace(trimmed,()=>translate(trimmed));
    }
    cache.set(key,{original,shown});originals.set(node,cache);
    if(shown!==current)write(shown);
  }
  function visit(node) {
    if(node.nodeType===Node.TEXT_NODE){
      if(!node.parentElement?.closest(excluded))translateValue(node,'text',node.nodeValue,s=>node.nodeValue=s);
      return;
    }
    if(node.nodeType!==Node.ELEMENT_NODE||node.closest(excluded))return;
    for(const key of attrs)translateValue(node,key,node.getAttribute(key),s=>node.setAttribute(key,s));
    if(node.matches('a[href]'))translateValue(node,'href',node.getAttribute('href'),s=>node.setAttribute('href',s));
    for(const child of node.childNodes)visit(child);
  }
  const switcher=document.getElementById('language-switch');
  function applyLanguage(){
    document.documentElement.lang=lang;
    const zh=lang!=='en';
    switcher.textContent=zh?'English':'中文';
    switcher.lang=zh?'en':'zh-Hans';
    switcher.setAttribute('aria-label',zh?'Switch to English':'切换为中文');
    document.title=translate('OpenMolSpec · Molecular data, spectra and tools');
    const prompt=document.getElementById('agent-prompt');
    const initial='List available tools, validate ethanol (CCO), then predict its ¹³C shifts with atom indices and ppm values.';
    if(prompt&&[initial,chinese(initial)].includes(prompt.value))prompt.value=translate(initial);
    visit(document.body);
    document.dispatchEvent(new CustomEvent('oms:language',{detail:{lang}}));
  }
  switcher.addEventListener('click',()=>{
    lang=lang==='en'?'zh-Hans':'en';
    const next=new URL(location.href);next.searchParams.set('lang',lang==='en'?'en':'zh');
    history.replaceState(history.state,'',next);
    try{localStorage.setItem('oms-language',lang);}catch{}
    applyLanguage();
  });
  applyLanguage();
  new MutationObserver(changes=>{
    for(const change of changes){
      if(change.type==='childList'){for(const node of change.addedNodes)visit(node);}
      else if(change.type==='characterData')visit(change.target);
      else if(!change.target.closest(excluded)){const key=change.attributeName;translateValue(change.target,key,change.target.getAttribute(key),s=>change.target.setAttribute(key,s));}
    }
  }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:[...attrs,'href']});
})();
