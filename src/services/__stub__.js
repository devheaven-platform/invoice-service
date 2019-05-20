const taskResponse = [
    {
        name: "Task 1",
        hours: 5,
    },
    {
        name: "Task 2",
        hours: 7,
    },
];

const columnResponse = [
    {
        tasks: taskResponse,
    },
];

const boardResponse = {
    boards: [
        {
            columns: columnResponse,
        },
        {
            columns: columnResponse,
        },
    ],
};

const get = ( resource ) => {
    if ( resource.includes( "/boards/for" ) ) {
        return new Promise( resolve => setTimeout( resolve, 100, { data: boardResponse, status: 200 } ) );
    }
    return null;
};

module.exports = {
    get,
};
