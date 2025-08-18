# expressJS versioning

## express version: 
-  version : ^5.1.0

### First part : 5
-    Major release - Major/Breaking update
-    i.e. : 6.0.0
-           7.1.1

### *Second part* : 1
- Recommended Bug fixes 
- [ Security Updates]
-  i.e. : 5.2.0
-           5.3.1 

### Third part : 0
-    Minor changes [ optional updates ]
-    i.e : 5.1.1
-          5.1.3

## Version Symbols: 

# ` ^ ` caret symbol means : 
-   update the express to its latest minor and recommended release    
  - Current: `^5.1.0`  

  - Possible updates: `5.1.1`, `5.2.3`, `5.9.9`  

  - **Not allowed**: `6.0.0`


# ` ~ ` tilde symbol means : 
-   update the express just to its latest minor release
-   such as : current = ~5.1.0
   
-   Possible updates: `5.1.1`, `5.1.3`, `5.1.9`  

- **Not allowed**: `5.2.0`
   

# no symbol means : 
-   do not update any version automatically