interface State{
    age: number;
    image: HTMLImageElement | undefined;
}

type Action = {
    type: "add"   
} | {type: "changed_image"; image: HTMLImageElement | undefined};


const initialState: State = {
    age: 42,
    image: undefined,
};

function reducer(state: State, action: Action){
    switch (action.type){
        case 'add':
            return {
                ...state,
                age: state.age + 1
            };
        case 'changed_image':
            return {
                ...state,
                image: action.image
            }
        default:
            return state;
    }
}

export{ initialState, reducer}