/*
 * 여행 일정 데이터 — 이 파일만 수정하면 index.html 캘린더가 바뀝니다.
 * (페이지에서 드래그로 바꾼 내용은 '내보내기'로 이 파일 형식 그대로 받을 수 있어요)
 *
 * ⚠️ 공개 페이지(GitHub Pages)입니다. 이름·연락처·숙소·항공편·예약번호는 넣지 마세요.
 */
window.TRIP = {
  "title": "교토 · 오사카 여행",
  "eyebrow": "ATTUNED TRAVELLERS · 京都 · 大阪",
  "start": "2026-10-18",
  "end": "2026-10-22",
  "dayStart": "00:00",
  "dayEnd": "24:00",
  "cities": {
    "kyoto": {
      "label": "교토 京都",
      "color": "#b5412c"
    },
    "osaka": {
      "label": "오사카 大阪",
      "color": "#d9480f"
    },
    "move": {
      "label": "이동",
      "color": "#5f6b73"
    }
  },
  "tags": {
    "sight": {
      "label": "관광",
      "color": "#2f855a"
    },
    "food": {
      "label": "식사",
      "color": "#dd6b20"
    },
    "shop": {
      "label": "쇼핑",
      "color": "#b83280"
    },
    "move": {
      "label": "이동",
      "color": "#2b6cb0"
    },
    "rest": {
      "label": "휴식",
      "color": "#7a7466"
    }
  },
  "days": [
    {
      "date": "2026-10-18",
      "city": "osaka"
    },
    {
      "date": "2026-10-19",
      "city": "kyoto"
    },
    {
      "date": "2026-10-20",
      "city": "kyoto"
    },
    {
      "date": "2026-10-21",
      "city": "osaka"
    },
    {
      "date": "2026-10-22",
      "city": "move"
    }
  ],
  "events": [
    {"id":"emumiyng2","date":"2026-10-18","start":"06:00","end":"07:00","title":"이동/집→김해공항","tag":"move"},
    {"id":"emumixufh","date":"2026-10-18","start":"07:00","end":"07:30","title":"김해공항 도착","tag":"move"},
    {"id":"e1","date":"2026-10-18","start":"08:30","end":"10:00","title":"비행편/김해→오사카","tag":"move"},
    {"id":"e2","date":"2026-10-18","start":"12:00","end":"13:00","title":"점심 (TBD)","tag":"food"},
    {"id":"e3","date":"2026-10-18","start":"14:00","end":"15:00","title":"숙소 이동 · 짐 풀기","tag":"rest"},
    {"id":"e4","date":"2026-10-18","start":"18:30","end":"20:00","title":"저녁 (TBD)","tag":"food"},

    {"id":"e5","date":"2026-10-19","start":"08:30","end":"09:30","title":"교토 이동","tag":"move"},
    {"id":"e6","date":"2026-10-19","start":"10:00","end":"12:00","title":"관광 (TBD)","tag":"sight"},
    {"id":"e7","date":"2026-10-19","start":"12:30","end":"13:30","title":"점심 (TBD)","tag":"food"},
    {"id":"e8","date":"2026-10-19","start":"14:00","end":"17:00","title":"관광 (TBD)","tag":"sight"},

    {"id":"e9","date":"2026-10-20","start":"09:00","end":"11:30","title":"관광 (TBD)","tag":"sight"},
    {"id":"e10","date":"2026-10-20","start":"12:00","end":"13:00","title":"점심 (TBD)","tag":"food"},
    {"id":"e11","date":"2026-10-20","start":"15:00","end":"17:00","title":"쇼핑 (TBD)","tag":"shop"},

    {"id":"e14","date":"2026-10-21","start":"06:30","end":"08:30","title":"쇼핑 (TBD)","tag":"shop"},
    {"id":"e12","date":"2026-10-21","start":"10:00","end":"12:00","title":"관광 (TBD)","tag":"sight"},
    {"id":"e13","date":"2026-10-21","start":"19:00","end":"21:00","title":"저녁 (TBD)","tag":"food"},

    {"id":"emumj0t9h","date":"2026-10-22","start":"15:00","end":"16:00","title":"이동/교토→간사이공항(?터미널)","tag":"move"},
    {"id":"emumj06ag","date":"2026-10-22","start":"16:00","end":"16:30","title":"간사이공항 도착","tag":"move"},
    {"id":"e15","date":"2026-10-22","start":"17:30","end":"19:00","title":"비행편/오사카→김해","tag":"move"},
  ],
  "notes": [
    {
      "title": "교토 ↔ 오사카",
      "text": "JR 신쾌속 / 한큐 / 케이한 중 선택"
    },
    {
      "title": "10월 중순 날씨",
      "text": "낮 20°C 전후, 저녁엔 얇은 겉옷"
    }
  ]
};
