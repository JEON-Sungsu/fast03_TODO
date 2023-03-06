import dayjs from 'dayjs';

export const fillEmptyColumns = (columns, start, end) => {
    const filledColumns = columns.slice(0);

    // 1. 첫날 이전 공백 채우기
    const startDay = dayjs(start).get('day');
    //day 는 0~6 까지 토요일~ 일요일로 받음 그래서, 해당 월의 1일의 day(요일)을 구하면 그앞에 공백이 몇개가 더 들어가야되는지 알 수 있는거임.
    //지금의 경우에는 3월이 기준이고, 3월 1일은 수요일이므로 startDay는 3을 반환함.
    for (let i = 1; i <= startDay; i += 1) {
        const date = dayjs(start).subtract(i, 'day');
        filledColumns.unshift(date);
    }
    //반환된 3번만큼 for 문을 돌려서 subtract 메소드로, 1일전,2일전,3일전의 day들을 구함.
    //unshift 메소드는 값을 배열의 제일 앞쪽부터 채워서 넣어줌

    // 2. 마지막날 이후 공백 채우기
    const endDay = dayjs(end).get('day');
    /**
    0 -> 6
    1 -> 5
    2 -> 4
    endDay + ? = 6
   */
    for (let i = 1; i <= 6 - endDay; i += 1) {
        const date = dayjs(end).add(i, 'day');
        filledColumns.push(date);
    }

    return filledColumns;
};
export const getCalendarColumns = (now) => {
    const start = dayjs(now).startOf('month'); //now 로 받은 현재 일자의 월 의 첫번째 날을 가져옴 로그에 찍히는건 2월28일인데, 이게 영국시간 기준이라 그런듯. 우리컴퓨터 기준으로 변경되니 걱정 ㄴㄴ
    const end = dayjs(now).endOf('month'); //now 로 받은 현재 일자의 월 의 마지막 날을 가져옴
    const endDate = dayjs(end).get('date'); //마지막 날짜의 일을 가져옴 위에걸로 하면 YYYY-mm-dd-hh:mm:ss 형태로 가져와서 그냥 일자만 가져옴

    const columns = [];
    for (let i = 0; i < endDate; i += 1) {
        const date = dayjs(start).add(i, 'day');
        columns.push(date);
    }

    const filledColumns = fillEmptyColumns(columns, start, end);
    return filledColumns;
};
