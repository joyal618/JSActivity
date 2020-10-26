async function getDetails() {

    var response = await fetch('http://52.203.100.234:5010/files/stops.txt');
    var data = await response.json();
    return data;
}

async function detailsTransform() {
    var datas = await getDetails();
    var modifiedData = datas.map(data => {
        if (data.wheelchair_boarding)
            data.wheelchair_boarding = true
        else
            data.wheelchair_boarding = false
        return {
            stationId: data.stop_id,
            stationName: data.stop_name,
            location: {
                latitude: data.stop_lat,
                longitude: data.stop_lon
            },
            wheelChairSuitable: data.wheelchair_boarding,

            theme: "HAHA",

            themeDesc: "HEHE",

        }

    })
    document.getElementById("demo1").innerHTML = JSON.stringify(modifiedData)
}

async function fareRules() {
    let rules = await fetch("http://52.203.100.234:5010/files/fare_rules.txt")
    let rulesData = await rules.json()
    return rulesData
}

async function fareAttributes() {
    let attributes = await fetch("http://52.203.100.234:5010/files/fare_attributes.txt")
    let ruleAttribute = await attributes.json()
    return ruleAttribute
}

async function fareCalculate() {
    let ruleAttribute = await fareAttributes()
    let ruleData = await fareRules()


    var modifiedData = ruleData.map(ruleObject => {



        ruleAttribute.map(rule => {
            if (ruleObject.fare_id == rule.fare_id) {
                ruleObject.fare_id = rule.price
            }
        })

        return {
            "OriginId": ruleObject.origin_id,
            "DestId": ruleObject.destination_id,
            "Price": ruleObject.fare_id,
        }
    }).filter(data => data.OriginId != undefined)

    document.getElementById("demo2").innerHTML = JSON.stringify(modifiedData)
    console.log(modifiedData)


}


