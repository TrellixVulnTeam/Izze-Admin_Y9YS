function useCalories() {
    let caloriesData = [];
    for (let i = 900; i <= 3000; i += 100) {
        let sampleObject: any = {};
        sampleObject.id = i;
        sampleObject.name = i.toString();
        caloriesData.push(sampleObject)
    }
    return caloriesData;
}

export default useCalories;