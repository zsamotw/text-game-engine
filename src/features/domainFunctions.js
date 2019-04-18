const R = require('ramda');
const HF = require('./helperFunctions');

const getElemEqualsToCommand = (command, elems) => R.find(HF.restCommandEqName(command), elems);

const addElemToPocket = (elem, state) => {
    const elems = HF.getElemsForCurrentStage(state);
    const elemsWithoutElem = R.filter((e) => e.name !== elem.name, elems);

    const newStages = HF.mapStages(HF.getStages(state), HF.getCurrentStageId(state), 'elems', elemsWithoutElem);

    const pocketWithElem = R.append(elem, HF.getPocket(state));

    const computeNewState = (state) => {
        const tempState = R.assoc('stages', newStages, state);
        return R.assoc('pocket', pocketWithElem, tempState);
    };

    const newState = computeNewState(state);
    const message = `${elem.name} was taken`;
    return {
        newState: newState,
        message: message
    };
};

const putElemToStage = (elem, state) => {
    const elems = HF.getElemsForCurrentStage(state);
    const elemsWithElem = R.append(elem, elems);

    const newStages = HF.mapStages(HF.getStages(state), HF.getCurrentStageId(state), 'elems', elemsWithElem);

    const pocketWithOutElem = R.filter((e) => e.name !== elem.name, HF.getPocket(state));

    const computeNewState = (state) => {
        const tempState = R.assoc('stages', newStages, state);
        return R.assoc('pocket', pocketWithOutElem, tempState);
    };

    const newState = computeNewState(state);
    const message = `${elem.name} was put`;
    return {
        newState: newState,
        message: message
    };
};

module.exports = {
    getElemEqualsToCommand: getElemEqualsToCommand,
    addElemToPocket: addElemToPocket,
    putElemToStage: putElemToStage
};
