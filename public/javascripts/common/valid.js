module.exports = {
    /**
     * Method check null input
     * return true if not null and false is null
     */
    valid_Input: (input) => {
        let result = false;
        if (input === '' || input === "" || input === null) {
            result = true;
        }
        return result;
    }
}