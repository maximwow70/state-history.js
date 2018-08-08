const initialValue = "test";
const stateHistory = new StateHistory(initialValue, new StateHistoryParams(10));

window.addEventListener("load", () => {
    
    const input = document.querySelector("input");
    const previousButton = document.querySelector("button.previous");
    const nextButton = document.querySelector("button.next");
    const resetButton = document.querySelector("button.reset");
    const info = document.querySelector(".info");

    var stateChanged = () => {
        info.innerHTML = `
            stateMap: ${stateHistory.getStateMap()}
            <br>
            currentState: ${stateHistory.getCurrentState()}
        `;
    };

    var setValue = () => {
        input.value = stateHistory.getCurrentState();
        stateChanged();
    };
    
    input.value = initialValue;
    stateChanged();
    input.addEventListener("input", () => {
        stateHistory.setState(input.value);
        stateChanged();
    });
    
    previousButton.addEventListener("click", () => {
        stateHistory.previous();
        setValue();
    });
    nextButton.addEventListener("click", () => {
        stateHistory.next();
        setValue();
    });
    resetButton.addEventListener("click", () => {
        stateHistory.reset();
        setValue();
    });
});
