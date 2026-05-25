#!/usr/bin/env python3
"""Batch generate deep analysis for all 32 lab members using Kimi k2.6 API"""

import json
import time
import sys

import requests

API_KEY = 'sk-HjX9XXQNNHzrD1zlJRdD7zqY6HXFRpa4VsW6lSc2F742GHbg'
BASE_URL = 'https://api.moonshot.cn/v1'

members = [
    {'id': 'p1', 'name': '严巍', 'roleLabel': '研究员', 'subRole': '研究员', 'researchDirection': '等离激元光操控、涡旋光学、微纳波导固态界面光学微操控'},
    {'id': 'p3', 'name': '谢宇', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': 'SiC微槽天线与FIB加工'},
    {'id': 'p4', 'name': '邵露青', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': '光纤激光直写与TEM分析'},
    {'id': 'p5', 'name': '陈瑞溢', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': '激光彩钛与TiN防伪'},
    {'id': 'p6', 'name': '潘婧', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': '光计算与光纤超表面'},
    {'id': 'p7', 'name': '薛环一', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': '扫描热显微镜与TEM表征'},
    {'id': 'p8', 'name': '赵康', 'roleLabel': '助理研究员', 'subRole': None, 'researchDirection': '冰刻技术与生物光子学'},
    {'id': 'p9', 'name': '吕未', 'roleLabel': '博士后', 'subRole': None, 'researchDirection': '微纳光子学、光场调控'},
    {'id': 'p10', 'name': '孙歆语', 'roleLabel': '博士后', 'subRole': None, 'researchDirection': '冰刻剥离与范德华接触'},
    {'id': 'p11', 'name': '刘天远', 'roleLabel': '博士后', 'subRole': None, 'researchDirection': '随机介质涡旋光学'},
    {'id': 'x1', 'name': '薛淑雯', 'roleLabel': '博士后', 'subRole': None, 'researchDirection': '消色差超透镜与跨波段成像'},
    {'id': 'd1', 'name': '陈博取', 'roleLabel': '博士生', 'subRole': '2021级', 'researchDirection': 'SiC并行激光加工与可调超表面'},
    {'id': 'd2', 'name': '卢奕含', 'roleLabel': '博士生', 'subRole': '2021级', 'researchDirection': 'SiC超表面审稿回复'},
    {'id': 'd3', 'name': '齐利民', 'roleLabel': '博士生', 'subRole': '2021级', 'researchDirection': 'SiC光子学表征'},
    {'id': 'd4', 'name': '孙潇雨', 'roleLabel': '博士生', 'subRole': '2021级', 'researchDirection': 'SiC微孔制备与毕业论文'},
    {'id': 'd5', 'name': '邓卉彤', 'roleLabel': '博士生', 'subRole': '2021级', 'researchDirection': '毕业论文修改与盲审回复'},
    {'id': 'd6', 'name': '周子博', 'roleLabel': '博士生', 'subRole': '2022级', 'researchDirection': '毕业论文修改与答辩准备'},
    {'id': 'd7', 'name': '裴海月', 'roleLabel': '博士生', 'subRole': '2022级', 'researchDirection': '低温制冷系统与嵌入式芯片'},
    {'id': 'd8', 'name': '杨治蓉', 'roleLabel': '博士生', 'subRole': '2022级', 'researchDirection': '冰刻金属结构与水熊虫光热'},
    {'id': 'd19', 'name': '王启南', 'roleLabel': '博士生', 'subRole': '2022级', 'researchDirection': '钙钛矿探测器与TRPL表征'},
    {'id': 'd9', 'name': '马墨南', 'roleLabel': '博士生', 'subRole': '2022级', 'researchDirection': 'OTE光热驱动与金片操控'},
    {'id': 'd10', 'name': '欧阳祖希', 'roleLabel': '博士生', 'subRole': '2023级', 'researchDirection': '纳米多孔碳与冰刻应用'},
    {'id': 'd11', 'name': '李晓萱', 'roleLabel': '博士生', 'subRole': '2023级', 'researchDirection': '金刚石超透镜与冷台设计'},
    {'id': 'd12', 'name': '欧玟', 'roleLabel': '博士生', 'subRole': '2023级', 'researchDirection': '柔性有机光伏'},
    {'id': 'd13', 'name': '章子鉴', 'roleLabel': '博士生', 'subRole': '2024级', 'researchDirection': 'SiC消色差超透镜与高功率'},
    {'id': 'd14', 'name': '李志浩', 'roleLabel': '博士生', 'subRole': '2024级', 'researchDirection': 'SiC超透镜与片上集成'},
    {'id': 'd15', 'name': '陈飞霖', 'roleLabel': '博士生', 'subRole': '2025级', 'researchDirection': 'SThM扫描热显微镜'},
    {'id': 'd16', 'name': '林春博', 'roleLabel': '博士生', 'subRole': '2025级', 'researchDirection': '电子束力与光操控'},
    {'id': 'd17', 'name': '虞阳', 'roleLabel': '博士生', 'subRole': '2025级', 'researchDirection': 'SiC悬臂梁计算光谱仪'},
    {'id': 'x3', 'name': '郑豪杰', 'roleLabel': '本科生', 'subRole': '2022级', 'researchDirection': '本科毕业论文'},
    {'id': 'x2', 'name': '王旭杰', 'roleLabel': '博士生', 'subRole': '2026级', 'researchDirection': '冰刻生物机器人与冷冻保存'},
    {'id': 'x4', 'name': '陈代吉', 'roleLabel': '访问学生', 'subRole': None, 'researchDirection': '光电子学理论学习'},
]


def build_prompt(person):
    sub = f"({person['subRole']})" if person['subRole'] else ''
    return f"""请对以下科研人员进行深度分析，并以 JSON 格式输出：

姓名：{person['name']}
身份：{person['roleLabel']}{sub}
研究方向：{person['researchDirection']}

请输出以下结构的 JSON：
{{
  "researchProgress": "对该人员科研进展的评估（200字左右）",
  "researchHotspots": ["相关领域热点1", "热点2", "热点3"],
  "suggestedDirections": [
    {{
      "title": "建议标题",
      "description": "具体描述",
      "feasibility": "高/中/低",
      "timeline": "预计周期"
    }}
  ],
  "riskAssessment": "风险提醒",
  "overallAdvice": "总体建议"
}}"""


def call_kimi(person):
    prompt = build_prompt(person)
    resp = requests.post(
        f'{BASE_URL}/chat/completions',
        headers={
            'Authorization': f'Bearer {API_KEY}',
            'Content-Type': 'application/json',
        },
        json={
            'model': 'kimi-k2.6',
            'messages': [
                {'role': 'system', 'content': '你是一个专业的科研顾问助手，擅长分析科研人员的进展并给出具体的下一步研究建议。请以严格的 JSON 格式输出，不要包含任何其他文字。'},
                {'role': 'user', 'content': prompt},
            ],
            'max_tokens': 4000,
            'thinking': {'type': 'disabled'},
        },
        timeout=45,
    )
    resp.raise_for_status()
    data = resp.json()
    content = data['choices'][0]['message']['content']
    cleaned = content.replace('```json', '').replace('```', '').strip()
    return json.loads(cleaned)


def main():
    results = {}
    errors = []

    for i, person in enumerate(members):
        pid = person['id']
        name = person['name']
        print(f'[{i+1}/32] {name} ({pid})... ', end='', flush=True)

        try:
            time.sleep(1.0)
            r = call_kimi(person)

            results[pid] = {
                'personId': pid,
                'personName': name,
                'analysisDate': '2026-05-17T12:00:00.000Z',
                'model': 'kimi-k2.6',
                'researchProgress': r['researchProgress'],
                'researchHotspots': r['researchHotspots'],
                'suggestedDirections': r['suggestedDirections'],
                'riskAssessment': r['riskAssessment'],
                'overallAdvice': r['overallAdvice'],
            }
            print(f"OK ({len(r['researchHotspots'])}h/{len(r['suggestedDirections'])}d)")

        except Exception as e:
            print(f'ERR: {str(e)[:60]}')
            errors.append({'id': pid, 'name': name, 'error': str(e)})

    print(f"\n{'='*50}")
    print(f'Done: {len(results)}/32 success, {len(errors)} failed')

    # Save results
    output = {
        'deepAnalyses': results,
        'errors': errors,
    }
    with open('/mnt/agents/output/app/scripts/deep_analyses_32.json', 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f'Results saved to deep_analyses_32.json')


if __name__ == '__main__':
    main()
