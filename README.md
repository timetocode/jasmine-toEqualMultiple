# jasmine-toEqualMultiple
A jasmine.js custom matcher that allows multiple possible values. The test passes if the actual value is ANY of the expected values. Another name for the matcher could be toEqualOneOf.

## Usage
Here is a test of the custom matcher.

```javascript
describe('toEqualMultiple', function() {

    // include the custom matcher
    beforeEach(function() {
        jasmine.addMatchers({
            toEqualMultiple: function(util, customEqualityTesters) {
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
        })
    })

    it('can test for two possibilities', function () {
        // 50% chance of coinFlip being the string 'heads' or 'tails'
        var coinFlip = (Math.random() > 0.5) ? 'heads' : 'tails'

        // expect 'heads' or 'tails'
        expect(coinFlip).toEqualMultiple('heads', 'tails')
        // don't expect 'red', 'blue', 'green'
        expect(coinFlip).not.toEqualMultiple('red', 'blue', 'green')
    })

    it('can test a great many possibilities', function () {
        var randomIntegerInRange = function(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1)) + min
        }

        // a random integer from 0 to 3
        var myRandomInteger = randomIntegerInRange(0, 3)

        // expect myRandomInteger to be at least on of these numbers (-2 to 7)
        expect(myRandomInteger).toEqualMultiple(-2, -1, 0, 1, 2, 3, 4, 5, 6, 7)
        // don't expect -3 to -1 nor 4 to 7
        expect(myRandomInteger).not.toEqualMultiple(-3, -2, -1, 4, 5, 6, 7)
    })
})
```
