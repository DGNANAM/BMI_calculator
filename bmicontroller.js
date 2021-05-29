const BmiInput = require('./data.json');

exports.Bmi = (request,response) => {

    if(!BmiInput.length)
        return response.send({'status':404, 'message': 'Not found'});

    var peopleBmi = [];
    BmiInput.map(person => {
        let tempBmi;

        if(!person.HeightCm && person.HeightCm ===0 && !person.WeightKg && !person.WeightKg === 0)
            return;

        let heightInmeter = person.HeightCm/100,
        Bmi = (person.WeightKg / (heightInmeter **2)).toFixed(2);
        if(Bmi <= 18.4) {
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'Underweight','healthRisk':'Malnutritionrisk'};
        }
        else if (Bmi <= 24.9 ) {
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'Normalweight','healthRisk':'Lowrisk'};
        }
        else if (Bmi <= 29.9) {
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'Overweight','healthRisk':'Enhancedrisk'};
        }
        else if (Bmi <= 34.9){
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'Moderatelyobese','healthRisk':'Mediumrisk'};
        }
        else if (Bmi <= 39.9) {
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'SeverelyObese','healthRisk':'Highrisk'};
        }
        else{
            tempBmi = {'Bmi':Bmi , 'BmiCategory':'VerySeverelyObese','healthRisk':'Veryhighrisk'};
        }
        peopleBmi.push(tempBmi);
    })

    let OverweightCount = 0 ,ModeratelyobeseCount = 0,SeverelyObeseCount = 0, VerySeverelyObeseCount = 0;
    
    if(!peopleBmi.length)
     return;

    peopleBmi.forEach(person => {
        if(person.BmiCategory === 'Overweight') {
            OverweightCount++;
        }
        else if(person.BmiCategory === 'Moderatelyobese') {
            ModeratelyobeseCount++;
        }
        else if(person.BmiCategory === 'SeverelyObese') {
            SeverelyObeseCount++;
        }
        else if(person.BmiCategory === 'VerySeverelyObese'){
            VerySeverelyObeseCount++;
        }
    })
    
    let FinalCount = {
        'OverweightCount' : OverweightCount ,
        'ModeratelyobeseCount':ModeratelyobeseCount,
        'SeverelyObeseCount':SeverelyObeseCount,
        'VerySeverelyObeseCount':VerySeverelyObeseCount
    };
    return response.send({
        'status':200,
        'Message':`Total counts  Overweight Count : ${FinalCount.OverweightCount}, Moderately obese Count ${FinalCount.ModeratelyobeseCount}, Severely Obese Count : ${FinalCount.SeverelyObeseCount}, Very Severely Obese Count:${FinalCount.VerySeverelyObeseCount}`
    });
}
