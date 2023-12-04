from collections import defaultdict

with open("data/03_1.txt") as file:
    data = file.read().split()
    grid = []
    for row in data:
        grid.append([ch for ch in row])

def findCoords(i,j, res, coord):
    res.append(grid[i][j])
    coord[0] = coord[0] or findSpecial(i,j)
    grid[i][j] = "."
    j += 1
    if j < COLS and grid[i][j].isdigit():
        findCoords(i,j,res, coord)
    return res, coord


def findSpecial(i,j):
    for dr,dc in (1,0), (-1,0), (0,-1), (0,1), (1,1), (1,-1), (-1,-1), (-1,1):
        r = dr + i
        c = dc + j
        if 0 <= r < ROWS and 0 <= c < COLS and not grid[r][c].isdigit() and grid[r][c] != ".":
            return (r,c)

ROWS = len(grid)
COLS = len(grid[0])
coords = defaultdict(list)
part1 = part2 = 0

for r in range(ROWS):
    for c in range(COLS):
        if grid[r][c].isdigit():
            res, coord = findCoords(r,c,[], [()])
            num = int("".join(res))
            coord = coord[0]
            if coord:
                part1 += num
                coords[coord].append(num)


for c in coords:
    c = coords[c]
    if len(c) == 2:
        part2 += (c[0] * c[1])

print(part1, part2)