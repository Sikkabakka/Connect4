
def nextPrimeNumber(number : int) -> int:
    while True:
        for i in range(2, number):
            if number % i == 0:
                break
        else:
            return number
        number += 1
def primenumbercheck(number : int) -> bool:
    if number <= 1:
        return False
    for i in range(2, number):
        if number % i == 0:
            print("%d is divisible", i)
            return False
    return True

print(nextPrimeNumber(32000000))
print(primenumbercheck(nextPrimeNumber(32000000)))