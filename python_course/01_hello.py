b = int(input("Enter base"))
h = int(input("Enter height"))
area = 0.5*b*h
print (f"Area of triangle = {area}")

if area >50:
   print ("Large number")
elif area <20:
   print ("Small number")
else:
   print("Medium number")

