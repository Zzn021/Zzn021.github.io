---
layout: post
title:  "Rust References & Borrowing"
date:   2024-09-21 22:50:22 +1100
categories: blog
tags: 
    - Rust 
    - UNSW
    - comp6991
---

### Ownership ###

* One owner per value.  
* When the owner goes out of scope, the value is freed.  
* Moving a value hands the keys to a new owner.  

Borrowing lets multiple parts of your program *read* (or *temporarily edit*) a value
without transferring ownership.

```rust
fn main() {
    let s = String::from("rust");       // s owns the heap data
    let len = calculate_length(&s);     // borrow immutably
    println!("'{s}' is {len} bytes long");
}

fn calculate_length(text: &String) -> usize {
    text.len()                          // read-only access
}
```

### Immutable References (`&T`) ###

Analogy: Passing a photocopy of a library book. Everyone can read, nobody can scribble.

* we can create any number of `&T` references simultaneously.
* The original owner maintains full control and is still usable.

```rust
    let a = String::from("rust");

    let ref1 = &a;
    let ref2 = &a;
    println!("{ref1} - {ref2}");        // both fine
```

### Mutable References (`&mut T`) ###

with `mut` we can modify the borrowed variable.

```rust
    let mut s = String::from("mutable");

    change(&mut s);
    println!("{s}");                    // prints "mutable string"

    fn change(task: &mut String) {
        task.push_str(" string");
    }
```

If we have a mutable reference to a value, we can have no other references to that value.

```rust
    let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);         // This fails
```

### The Rules of References ###
- At any given time, you can have either one mutable reference or any number of immutable references.
- References must always be valid.
