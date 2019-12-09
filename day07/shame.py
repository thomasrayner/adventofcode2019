# I couldn't figure out what the heck pt 2 wanted so I straight up ganked this
# https://github.com/xADDBx/Advent-of-Code/blob/master/Day%207/Day7_2.py
import itertools

code = open('day7.txt').read().split(',')
code = list(map(int, code))

def run():
    lst = code[:]
    d = 0
    while 1:
        cmd = lst[d]
        op = cmd % 100
        if op == 1:
            first = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            second = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            lst[lst[d + 3]] = first + second
            d += 4
        elif op == 2:
            first = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            second = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            lst[lst[d + 3]] = first * second
            d += 4
        elif op == 3:
            lst[lst[d+1]] = yield
            d += 2
        elif op == 4:
            yield lst[lst[d+1]]
            d += 2
        elif op == 5:
            a = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            if a != 0:
                d = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            else:
                d += 3
        elif op == 6:
            a = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            if a == 0:
                d = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            else:
                d += 3
        elif op == 7:
            first = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            second = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            lst[lst[d + 3]] = 1 if first < second else 0
            d += 4
        elif op == 8:
            first = lst[d + 1] if cmd // 100 % 10 == 1 else lst[lst[d + 1]]
            second = lst[d + 2] if cmd // 1000 % 10 == 1 else lst[lst[d + 2]]
            lst[lst[d + 3]] = 1 if first == second else 0
            d += 4
        elif op == 99:
            break

maxi = []
num = [5,6,7,8,9]
for x in itertools.permutations(num):
    inp = []
    for tik in x:
        generator = run()
        next(generator)
        generator.send(tik)
        inp.append(generator)
        outp=0
    while 1:
        for generator in inp:
            outp = generator.send(outp)
            maxi.append(outp)
        try:
            for generator in inp:
                next(generator)
        except: break

print(max(maxi))