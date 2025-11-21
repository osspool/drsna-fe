
file_path = r'd:\projects\it\clinic\demo\data\intimate-health\male\treatments\shockwave-therapy.json'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 1-94 (indices 0-93)
# Note: line numbers in view_file are 1-indexed.
# Line 94 is index 93.
part1 = lines[:94]

# Extract lines 189-742 (indices 188-742)
# Line 189 is index 188.
# Line 742 is index 741.
part2 = lines[188:742]

# Add closing brace
part3 = ['}\n']

new_content = part1 + part2 + part3

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_content)

print("File repaired.")
