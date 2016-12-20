var toEqualMultiple = function(util, customEqualityTesters) {
    return {
        compare: function(/* arg1, arg2, etc...*/) {
            if (!arguments[1]) {
                throw 'toEqualMultiple invalid arguments, expected at least one argument'
            }
            var actual = arguments[0]
            var expected = ''
            var argsArray = Object.keys(arguments)
            for (var i = 1; i < argsArray.length; i++) {
                if (i > 1) {
                    expected += ', '
                }
                expected += arguments[argsArray[i]]
            }

            var result = {}

            for (var i = 1; i < arguments.length; i++) {
                if (arguments[i] === actual) {
                    result.pass = true
                    result.message = 'Expected ' + 
                        actual + ' to equal one of ' + expected
                    return result
                }
            }

            result.pass = false
            result.message = 'Expected ' + 
                actual + ' to equal one of ' + expected
            return result
        }
    }
}