const faker = require('faker');


const couriers = [
    {
        "count": 990,
        "courier_id": 1085
    },
    {
        "count": 984,
        "courier_id": 1071
    },
    {
        "count": 844,
        "courier_id": 1112
    },
    {
        "count": 786,
        "courier_id": 924
    },
    {
        "count": 775,
        "courier_id": 738
    },
    {
        "count": 761,
        "courier_id": 469
    },
    {
        "count": 754,
        "courier_id": 916
    },
    {
        "count": 740,
        "courier_id": 846
    },
    {
        "count": 732,
        "courier_id": 1077
    },
    {
        "count": 730,
        "courier_id": 50
    },
    {
        "count": 725,
        "courier_id": 1081
    },
    {
        "count": 661,
        "courier_id": 1073
    },
    {
        "count": 616,
        "courier_id": 819
    },
    {
        "count": 614,
        "courier_id": 1111
    },
    {
        "count": 610,
        "courier_id": 1033
    },
    {
        "count": 606,
        "courier_id": 1121
    },
    {
        "count": 604,
        "courier_id": 935
    },
    {
        "count": 593,
        "courier_id": 852
    },
    {
        "count": 586,
        "courier_id": 1118
    },
    {
        "count": 570,
        "courier_id": 1031
    },
    {
        "count": 564,
        "courier_id": 774
    },
    {
        "count": 561,
        "courier_id": 1084
    },
    {
        "count": 559,
        "courier_id": 601
    },
    {
        "count": 551,
        "courier_id": 860
    },
    {
        "count": 534,
        "courier_id": 1056
    },
    {
        "count": 530,
        "courier_id": 381
    },
    {
        "count": 522,
        "courier_id": 1176
    },
    {
        "count": 517,
        "courier_id": 696
    },
    {
        "count": 514,
        "courier_id": 893
    },
    {
        "count": 513,
        "courier_id": 1134
    },
    {
        "count": 510,
        "courier_id": 870
    },
    {
        "count": 509,
        "courier_id": 473
    },
    {
        "count": 505,
        "courier_id": 1059
    }
];
const data = couriers.map(courier => {
    return {
        id: courier.courier_id,
        name: faker.name.findName(),
        transport_type: faker.random.arrayElement([
            "Bike",
            "Car",
            "Bicycle",
        ]),
        avatar: faker.image.avatar(),
    };

});

console.log(JSON.stringify(data, null, 2));
