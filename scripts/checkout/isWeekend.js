export function isWeekend(date){
    return ['Sunday', 'Saturday'].includes(date.format('dddd'));
}
    