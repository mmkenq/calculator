export default function RdCalcConfig(){
	const categoryNames = ['Техническое серебро', 'Конденсаторы', 'Лампы'];
	const measureNames = ['гр', 'кг', 'шт'];
	const priceEndings = ['руб.', '$'];

	// Categories data
	const categories = [
		{
			id: 'silver',
			//nameId: 0,
			isActive: true,
			products: [
				{
					name: 'СЕРЕБРО 25% на меди',
					isActive: true,
					//category: 0,
					description: 'd1',
					price: '3000',
					price_ending: 0,
					measure: 0, 
				},
				{
					name: 'СЕРЕБРО 60% магнитное',
					isActive: true,
					//category: 1, 
					description: 'de2',
					price: '770',
					price_ending: 0,
					measure: 1,
				},
				{},
				{},
			],
		},
		{
			id: 'condenser',
			products: [
				{},
				{},
			],
		},
	];

	this.categoryNames = categoryNames;
	this.measureNames = measureNames;
	this.priceEndings = priceEndings;
	this.categories = categories;
}
