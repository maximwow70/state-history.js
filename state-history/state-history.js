StateHistoryParams.DEFAULT_MAX_STATE_LENGTH = 10;
function StateHistoryParams(maxStateLength) {
    this.maxStateLength = maxStateLength || StateHistoryParams.DEFAULT_MAX_STATE_LENGTH;
};


function StateHistory(state, params) {
    this._stateMap = state ? [state] : [];
    this._params = params;

    this._currentStateIndex = 0;
};
StateHistory.prototype.setState = function (state) {
    this._stateMap.push(state);
    if (this._stateMap.length > this._params.maxStateLength) {
        this._stateMap.shift();
    }
    this._currentStateIndex = this._stateMap.length - 1;
};
StateHistory.prototype.previous = function () {
    this._currentStateIndex = Math.max(0, this._currentStateIndex - 1);
    return this.getCurrentState();
};
StateHistory.prototype.next = function () {
    this._currentStateIndex = Math.min(this._currentStateIndex + 1, this._stateMap.length - 1);
    return this.getCurrentState();
};
StateHistory.prototype.reset = function () {
    this._stateMap = [this._stateMap.pop()];
    this._currentStateIndex = this._stateMap.length - 1;
    return this.getCurrentState();
};
StateHistory.prototype.getCurrentState = function () {
    return this._stateMap[this._currentStateIndex];
};
StateHistory.prototype.getStateMap = function () {
    return [...this._stateMap];
};
