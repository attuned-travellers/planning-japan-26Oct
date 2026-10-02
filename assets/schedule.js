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
    {"id":"emumjgcq7","date":"2026-10-18","start":"08:00","end":"08:30","title":"**리쿼샵** (면세점)","tag":"shop"},
    {"id":"e1","date":"2026-10-18","start":"08:30","end":"10:00","title":"비행편/김해→오사카","tag":"move"},
    {"id":"e2","date":"2026-10-18","start":"11:00","end":"12:00","title":"이동/간사이공항→오사카 시내 (우메다)","tag":"move"},
    {"id":"e7","date":"2026-10-18","start":"12:00","end":"13:00","title":"점심","tag":"food"},
    {"id":"e3","date":"2026-10-18","start":"13:00","end":"13:30","title":"체크인/The Rise Osaka Kitashinchi","tag":"rest","note":"Umeda 숙소"},
    {"id":"emumjoiv8","date":"2026-10-18","start":"13:30","end":"14:30","title":"숨쉬기","tag":"rest"},
    {"id":"emumjmkc8","date":"2026-10-18","start":"15:30","end":"16:30","title":"신세카이 (난바)","tag":"sight"},
    {"id":"emumjntu1","date":"2026-10-18","start":"16:30","end":"17:30","title":"호젠지 주변 이자카야 구경 (난바)","tag":"sight"},
    {"id":"e4","date":"2026-10-18","start":"18:00","end":"19:30","title":"졸맛탱 스시 (뒷메뉴 있는집)","tag":"food"},
    {"id":"emumralmn","date":"2026-10-18","start":"20:00","end":"21:00","title":"위스키바or시샤바","tag":"food"},
    {"id":"emumjxm5w","date":"2026-10-18","start":"21:00","end":"22:00","title":"수상한거리 구경 (난바)","tag":"sight"},
    {"id":"emumjvjev","date":"2026-10-18","start":"22:00","end":"24:00","title":"우메다 지하상가 술집거리","tag":"food"},

    {"id":"emumk2dzc","date":"2026-10-19","start":"00:00","end":"01:30","title":"숙소 복귀","tag":"rest"},
    {"id":"emumk2vym","date":"2026-10-19","start":"01:30","end":"08:00","title":"눈감고숨쉬기","tag":"rest"},
    {"id":"emumjff1u","date":"2026-10-19","start":"08:00","end":"09:00","title":"아침밥","tag":"food"},
    {"id":"emuorvm13","date":"2026-10-19","start":"09:00","end":"09:30","title":"숨쉬기","tag":"rest"},
    {"id":"emumjewr9","date":"2026-10-19","start":"09:30","end":"10:30","title":"체크아웃/오사카 숙소","tag":"move"},
    {"id":"emums4es4","date":"2026-10-19","start":"10:30","end":"11:30","title":"이동/오사카 우메다→교토 카라스마","tag":"move"},
    {"id":"emumw25q1","date":"2026-10-19","start":"11:30","end":"12:30","title":"체크인/Smart Place Inn Kyoto Shijo Horikawa","tag":"rest","note":"카라스마 숙소"},
    {"id":"emumj9w8q","date":"2026-10-19","start":"12:30","end":"13:30","title":"점심 (Nandattei 카레라멘)","tag":"food"},
    {"id":"emumw7cgr","date":"2026-10-19","start":"13:30","end":"14:00","title":"대규 과거미화 타코야끼","tag":"sight"},
    {"id":"emumw5jf4","date":"2026-10-19","start":"14:00","end":"15:30","title":"대규 눈돌아갈 시장구경","tag":"sight"},
    {"id":"emuork0cu","date":"2026-10-19","start":"15:30","end":"16:00","title":"시장 이자카야 체험","tag":"sight"},
    {"id":"emumja7a5","date":"2026-10-19","start":"17:30","end":"19:00","title":"존맛 야끼니꾸","tag":"food"},
    {"id":"emumw39k5","date":"2026-10-19","start":"19:30","end":"20:30","title":"적당히 비싼 니혼슈 사케집","tag":"food","note":"후보 - Kokoraya Karasuma"},
    {"id":"emumrucj4","date":"2026-10-19","start":"21:00","end":"24:00","title":"시죠포차 (New Shinmachi)","tag":"food"},

    {"id":"emumrv3dg","date":"2026-10-20","start":"00:00","end":"01:30","title":"숙소 복귀","tag":"rest"},
    {"id":"emumrvbk8","date":"2026-10-20","start":"01:30","end":"08:00","title":"눈감고숨쉬기","tag":"rest"},
    {"id":"emumtn1cl","date":"2026-10-20","start":"08:00","end":"09:00","title":"아침밥","tag":"food"},
    {"id":"emuorvd05","date":"2026-10-20","start":"09:00","end":"09:30","title":"숨쉬기","tag":"rest"},
    {"id":"emuorchrh","date":"2026-10-20","start":"09:30","end":"11:00","title":"기온 전통거리 구경?","tag":"sight","note":"옛날거리 → 키요미즈 → 사무라이 칼자국 거리"},
    {"id":"emuorf6bt","date":"2026-10-20","start":"11:00","end":"12:00","title":"교토풍 카페","tag":"food"},
    {"id":"emumj9yjw","date":"2026-10-20","start":"12:00","end":"13:00","title":"점심 (TBD)","tag":"food"},
    {"id":"emumptvhd","date":"2026-10-20","start":"16:30","end":"22:00","title":"(백) 개인약속","tag":"rest"},
    {"id":"e13","date":"2026-10-20","start":"19:00","end":"20:00","title":"저녁 (TBD)","tag":"food"},
    {"id":"emumruo0e","date":"2026-10-20","start":"21:00","end":"24:00","title":"시죠포차 (New Shinmachi)","tag":"food"},

    {"id":"emumrvlib","date":"2026-10-21","start":"00:00","end":"01:30","title":"숙소 복귀","tag":"rest"},
    {"id":"emumrvsg2","date":"2026-10-21","start":"01:30","end":"08:00","title":"눈감고숨쉬기","tag":"rest"},
    {"id":"emumtn8sv","date":"2026-10-21","start":"08:00","end":"09:00","title":"아침밥","tag":"food"},
    {"id":"emuorqwjn","date":"2026-10-21","start":"09:30","end":"11:00","title":"아라시야마 거리 구경","tag":"sight"},
    {"id":"e10","date":"2026-10-21","start":"12:00","end":"13:00","title":"점심 (Eitaro 유자라멘)","tag":"food"},
    {"id":"emuorhtu4","date":"2026-10-21","start":"13:00","end":"13:30","title":"(송) 숙소 복귀","tag":"move"},
    {"id":"emuorisxp","date":"2026-10-21","start":"13:30","end":"14:00","title":"(송) 숙소 → 교토역","tag":"move"},
    {"id":"emunng0k3","date":"2026-10-21","start":"14:00","end":"15:00","title":"(송) 이동/교토→간사이공항(?터미널)","tag":"move"},
    {"id":"emumjbsvy","date":"2026-10-21","start":"15:00","end":"15:30","title":"(송) 간사이공항 도착","tag":"move"},
    {"id":"emumsybdw","date":"2026-10-21","start":"16:00","end":"17:00","title":"(송) 쇼핑 (면세점)","tag":"shop"},
    {"id":"emumjc9jy","date":"2026-10-21","start":"17:30","end":"19:00","title":"(송) 비행편/오사카→김해","tag":"move"},
    {"id":"emumjahqv","date":"2026-10-21","start":"19:00","end":"20:00","title":"저녁 (TBD)","tag":"food"},
    {"id":"emumjd80v","date":"2026-10-21","start":"20:00","end":"21:00","title":"(송) 이동/김해공항→집","tag":"move"},
    {"id":"emumw0szx","date":"2026-10-21","start":"21:00","end":"24:00","title":"시죠포차 (New Shinmachi)","tag":"food"},

    {"id":"emumswufa","date":"2026-10-22","start":"00:00","end":"01:30","title":"숙소 복귀","tag":"rest"},
    {"id":"emumsx3xo","date":"2026-10-22","start":"01:30","end":"08:00","title":"눈감고숨쉬기","tag":"rest"},
    {"id":"emumw9g6n","date":"2026-10-22","start":"09:30","end":"10:30","title":"체크아웃/교토 숙소","tag":"move"},
    {"id":"emumja016","date":"2026-10-22","start":"12:00","end":"13:00","title":"점심 (TBD)","tag":"food"},
    {"id":"emumj0t9h","date":"2026-10-22","start":"14:00","end":"15:00","title":"(백) 이동/교토→간사이공항(?터미널)","tag":"move"},
    {"id":"emumj06ag","date":"2026-10-22","start":"15:00","end":"15:30","title":"(백) 간사이공항 도착","tag":"move"},
    {"id":"e15","date":"2026-10-22","start":"17:30","end":"19:00","title":"(백) 비행편/오사카→김해","tag":"move"},
    {"id":"emumjdlq7","date":"2026-10-22","start":"20:00","end":"21:00","title":"(백) 이동/김해공항→집","tag":"move"},
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
