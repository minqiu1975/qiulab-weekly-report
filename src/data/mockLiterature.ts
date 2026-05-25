import type { LiteratureItem } from '../types';

export const MOCK_LITERATURE: LiteratureItem[] = [
  {
    id: 'lit1', title: 'High-Efficiency Perovskite Photodetectors with Heterojunction Architecture',
    authors: ['Smith, J.', 'Zhang, Y.', 'Lee, K.'], abstract: 'We demonstrate a novel heterojunction architecture for perovskite photodetectors achieving external quantum efficiency over 95% and detectivity exceeding 10^13 Jones. The device structure incorporates a graded interface that minimizes recombination losses while enhancing carrier collection efficiency.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2401.01234', citationCount: 45, relevanceScore: 92,
  },
  {
    id: 'lit2', title: 'Topological Photonic Crystals: From Fundamental Concepts to Applications',
    authors: ['Wang, Z.', 'Chen, H.', 'Lu, L.'], abstract: 'This review provides a comprehensive overview of topological photonic crystals, covering their theoretical foundations, experimental realizations, and potential applications in robust optical devices and quantum information processing.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2402.04567', citationCount: 128, relevanceScore: 95,
  },
  {
    id: 'lit3', title: 'Integrated Silicon Photonic Neural Network Accelerator',
    authors: ['Park, S.', 'Kim, D.', 'Li, X.'], abstract: 'We present an integrated silicon photonic neural network accelerator capable of performing matrix-vector multiplication at 10 TOPS/W. The architecture uses cascaded Mach-Zehnder interferometers configured through on-chip heaters.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2403.07890', citationCount: 89, relevanceScore: 90,
  },
  {
    id: 'lit4', title: 'Two-Dimensional Material-Based Optoelectronic Devices: Recent Advances and Challenges',
    authors: ['Liu, W.', 'Huang, Y.', 'Gao, F.'], abstract: 'This paper reviews recent progress in 2D material-based optoelectronic devices, including photodetectors, light-emitting diodes, and solar cells. Key challenges in large-scale synthesis, device integration, and stability are discussed.',
    year: 2024, source: 'Semantic Scholar', url: 'https://doi.org/10.1038/s41566-024-01234', citationCount: 67, relevanceScore: 88,
  },
  {
    id: 'lit5', title: 'Metalens Array for Achromatic Focusing Across the Visible Spectrum',
    authors: ['Chen, X.', 'Wu, R.', 'Zhao, M.'], abstract: 'We design and experimentally demonstrate a metalens array capable of achromatic focusing across the entire visible spectrum (400-700 nm). The design uses coupled TiO2 nanofins with optimized geometry to compensate chromatic dispersion.',
    year: 2023, source: 'arXiv', url: 'https://arxiv.org/abs/2312.09876', citationCount: 156, relevanceScore: 93,
  },
  {
    id: 'lit6', title: 'Quantum Dot Light-Emitting Diodes with External Quantum Efficiency Over 30%',
    authors: ['Kim, J.', 'Park, H.', 'Lee, S.'], abstract: 'We report red quantum dot LEDs with EQE exceeding 30% through a combination of optimized shell structure and advanced interface engineering. The devices show excellent operational stability with LT95 over 1000 hours.',
    year: 2024, source: 'Semantic Scholar', url: 'https://doi.org/10.1038/s41563-024-01567', citationCount: 203, relevanceScore: 96,
  },
  {
    id: 'lit7', title: 'Cavity Optomechanics with Silicon Microdisks at Room Temperature',
    authors: ['Zhang, Q.', 'Li, M.', 'Wang, H.'], abstract: 'We demonstrate cavity optomechanical coupling in silicon microdisks at room temperature, achieving cooperativity exceeding unity. The results pave the way for chip-scale optomechanical sensors and transducers.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2404.11234', citationCount: 34, relevanceScore: 85,
  },
  {
    id: 'lit8', title: 'Nonlinear Optics in Integrated Photonic Platforms: A Review',
    authors: ['Johnson, T.', 'Brown, A.', 'Davis, R.'], abstract: 'This review covers nonlinear optical phenomena in integrated photonic platforms, including second-harmonic generation, four-wave mixing, and Kerr comb generation. Material platforms and device geometries are compared.',
    year: 2024, source: 'Semantic Scholar', url: 'https://doi.org/10.1364/OPTICA.123456', citationCount: 78, relevanceScore: 87,
  },
  {
    id: 'lit9', title: 'Flexible Optoelectronics Based on Organic-Inorganic Hybrid Perovskites',
    authors: ['Zhou, L.', 'Yang, F.', 'Liu, C.'], abstract: 'We present a comprehensive study of flexible optoelectronic devices based on hybrid perovskites, demonstrating excellent mechanical durability and maintained device performance under severe bending conditions.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2405.05678', citationCount: 56, relevanceScore: 82,
  },
  {
    id: 'lit10', title: 'Diffractive Deep Neural Networks for All-Optical Image Classification',
    authors: ['Lin, X.', 'Rivenson, Y.', 'Ozcan, A.'], abstract: 'We demonstrate all-optical image classification using diffractive deep neural networks implemented as 3D-printed terahertz diffractive layers. The system achieves classification accuracy comparable to digital neural networks for handwritten digits.',
    year: 2023, source: 'Semantic Scholar', url: 'https://doi.org/10.1126/science.aat8084', citationCount: 412, relevanceScore: 94,
  },
  {
    id: 'lit11', title: 'Microcavity Exciton-Polaritons for Topological Photonics',
    authors: ['Amo, A.', 'Bloch, J.'], abstract: 'We review the use of microcavity exciton-polaritons for studying topological photonic phenomena, including the creation of topological edge states and the realization of polariton topological insulators.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2406.07890', citationCount: 29, relevanceScore: 83,
  },
  {
    id: 'lit12', title: 'Silicon Photonic Optical Gyroscope with Enhanced Sensitivity',
    authors: ['Ma, P.', 'Zhang, Y.', 'Chen, L.'], abstract: 'We report a silicon photonic optical gyroscope with enhanced sensitivity through reciprocal sensitivity enhancement. The device achieves a bias stability of 0.1 deg/hour in a compact footprint.',
    year: 2024, source: 'arXiv', url: 'https://arxiv.org/abs/2407.08901', citationCount: 22, relevanceScore: 81,
  },
];

export function searchLiterature(query: string): LiteratureItem[] {
  const q = query.toLowerCase();
  return MOCK_LITERATURE
    .filter((item) =>
      item.title.toLowerCase().includes(q) ||
      item.abstract.toLowerCase().includes(q) ||
      item.authors.some((a) => a.toLowerCase().includes(q))
    )
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}
