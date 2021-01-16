exports.excerptTrim = (str, length, delim, appendix) => {
    if (str.length <= length) return str;
    var trimmedString = str.substr(0, length + delim.length);
    var lastDelimIndex = trimmedString.lastIndexOf(delim);
    if (lastDelimIndex >= 0) trimmedString = trimmedString.substr(0, lastDelimIndex);
    if (trimmedString) trimmedString += appendix;
    return trimmedString;
};