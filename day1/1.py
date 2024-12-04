# load input from file
with open('input') as f:
    input = [line.strip() for line in f.readlines()]

# part 1 total distance
list1, list2 = [int(i.split('   ')[0]) for i in input], [int(i.split('   ')[1]) for i in input]
list1.sort(), list2.sort()
total_distance = sum([abs(l1 - l2) for l1, l2 in zip(list1, list2)])

print(total_distance)

# part 2 similarity score
sim = sum([len([1 for i2 in list2 if i2 == i]) * i for i in list1])

print(sim)