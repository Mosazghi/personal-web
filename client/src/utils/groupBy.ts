// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function groupBy(array: any[], key: any) {
    return array.reduce((result, currentItem) => {
        (result[currentItem[key]] = result[currentItem[key]] || []).push(currentItem);
        return result;
    }, {});
}
