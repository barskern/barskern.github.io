---
title: Rust's awesome memory managment
tags:
  - programming
  - rust
difficulty: beginner
description: "Rust is a programming language that had it's first major release in 2015. It has a brand new way of handling memory which will change the way you think about data."
icon: rust_crab
iconLink: https://rust-lang.org
---

[Rust][1] has a lot of cool features. It is a systems programming language that aims to be a safe, fast and simple. One of the core characteristics is that it can guarante memory and thread safety, without needing a [garbage collector][2]. The way it achieves this is through a feature that separates [Rust][1] from all other programming languages; **ownership**.

There are 3 rules which governs ownership in [Rust][1]:

1. Each value in Rust has a variable that's called its _owner_
2. There can only be one _owner_ at a time
3. When the _owner_ goes out of scope, the value will be dropped (removed from memory)

_Taken from [The Rust Programming Language Book][3]_

These three rules are the guidelines for how data is handled. By following these rules, the compiler can assure you that you will have no data races and a fully threadsafe program, without needing a garbage collector. This prevents a runtime overhead for managing memory, which leads to a blazing fast program.

To get a good grip over what this really means, we're going to dive into some examples where I think that the idea and value of ownership is clear.

## Variable scoping

The first main thing we need to discuss is _scoping_. Almost all programming languages have some form of scoping. In Rust the scope plays an additional role. The scope defines how long a variable is valid, and when a variable leaves the scope it was defined in, it is dropped. This might seem like an obvious feature of most languages, and for most high level languages this is implicit. These languages normally have a garbage collector which deallocates values when they are not in use anymore. As mentionned above, this has some runtime performance impact. In lower level languages like C, memory allocated on the heap is not automatically deallocated (_See [this link][4] for the difference between heap and stack_). In C you have to manually free the memory through a function call.

Let's first look at some C code, where we want to use a dynamic array of integers.

```c
int main () {
  int array_size = /* some size */;  
  int *array = (int *) malloc(sizeof(int) * array_size);

  /* Do some work with our array */
  
  free(ptr_one);
  return 0;
}
``` 

Here we see that we first have to allocate a certain amount of bytes on the heap, and then we have to deallocate them when were done using them. However if return from main before we have cleaned up our array, we end up having a memory leak. Let's see how we would do the exact same operation in Rust.

```rust
fn main () {
  let array_size = /* some size */;
  let array = Vec::with_capacity(array_size);

  /* Do some work with our array */
}
```

In Rust we don't have to free the memory, despite that it's on the heap. The memory will automatically be dropped when we exit the scope. In this case the scope is the end of the function, however we can define a scope in the middle of a function.

Scoping is not the main reason that ownership is awesome, and automatic deallocation of variables on the heap that exit the scope are not brand new. However it is important to understand scoping when we start to talk about ownership.

In the simple example above it's really easy to tell where the value should be deallocated, so in C it's just about remembering to put the function call at the end of the scope. However when we start to get into multithreaded scenarios, where values should be deallocated isn't obivious anymore. Especially if several threads are writing and/or reading to the same memory location. We can't know when all the threads are done with the data, hence memory management becomes a bigger challange. This is where the second rule of ownership comes into play; _there can only be one owner at a time_.

## A single owner per variable

The second rule of ownership states that: _there can only be one owner at a time_. In practical terms, this means that there can only be one variable which actually controls the data. This means that if we transfer data to a new variable, that will be the new owner of the data. Hence some code that we would think would work, doesn't work in [Rust][1]:

```rust
let string = String::new("Hello world");
let new_string = string;

println!("{}", string); // Error: use of moved value
```

This is a piece of code that would normally work in most programming languages, however [Rust][1] doesn't let you compile this code. This is because `String` is a construct which is stored on the heap, and hence when we allocate `string` to `new_string`, we actually don't copy the values to a new place on the heap. What happens is that we give `new_string` the value on the heap, and `string` gives away ownership of the variable. This means that this value is _moved_ to a new owner.

We could also copy the string on the heap, and then have two identical variables, but then we have to tell Rust that we want to copy our variable. This makes us inherently prevent unecessary copying of values on the heap, which might take a long time. The way we would clone the data on the heap is through the `clone`-method. This way we are fully aware when we might do expensive memory copying.

```rust
let string = String::new("Hello world");
let new_string = string.clone(); 
              // ^ Duplicates values on the heap

println!("{}", string);
```

The idea that data has a single owner will cause us to think about where are data is defined, and use data in an efficient manner.

"A single owner sounds more like a huge limitation rather than a benefit!", you might be saying to yourself. And the way I have presented it so far, you are totally right. For now a single owner is an okay concept, but it would be hard to actually use it in a bigger project. This is where **borrowing** extends this concept to it's full potential.

## Borrowing

Just like we can borrow real world objects, we can borrow data in [Rust][1]. One could say that Rust tries to model the real world when it comes to borrowing. By using some simple rules, we can make sure that borrowing data will still follow the rules of ownership we listed above. We've already moved data, so now the two remaining things we could do with the data is either to let many people borrow it simultaneously immutably or to let one person borrow the ownership. 

An analogy to the real world, we can say that whenever you own an object, you can change it as much as you want. Then if someone asks to borrow it, you could give it to them so that they could also change it as they want. But then we have given away the object, so we can no longer alter it. It is also common decency to give back an object in a proper state once you're done borrowing it, so we're counting on that the person that borrows our object does that. A third way to give away information, is to put the object on display. Then many people could look at it at the same time, but then nobody can alter it. This is because we want everyone to see the same thing every time they check the object to maintain consistency.

As the paragraph above tries to explain, there are three ways we can share data.

1. **Move ownership**

    Give away the ownership to someone else.

2. **Mutable borrow**

    Let a single person borrow the ownership, with the promise that they won't destory the data. While that person borrows the data, the owner cannot alter it.

3. **Immutable borrow**

    Put the data on display so that many people can see it, but nobody (including the owner) cannot change it.

These are the three ways we can handle data in [Rust][1]. Through these three ways, we can do a lot of operations that still upholds the original ownership rules that we set in the beginning. This means that we can use these concepts to make memory safe and efficient programs, that are threadsafe. Let's look at a few examples to really understand the definition of _owner_, _mutable borrow_ and _immutable borrow_.

## Examples

_We won't write a full server, I just want to put the theory into practice by showing how Rust represents these concepts in code. This example is mainly to understand the concepts of ownership, not to understand Rust syntax and code. If you want to learn Rust, checkout [The Rust Programming Language (book)][5], which is a great resource for learning Rust._

We're making a webserver which recives requests from users and then returns the data that the user requested. On the side it also keeps track over how many users have used the service for statistics. Performance will be of the essence, so that our users will get their data fast.

### Handling the request

First were going to define how we answer request to our server. The actual request is coming from the network card, and it's loaded into the heap of our program. We then need to extract data from the request to find out what our user wants. An ignorant way would be to copy the data back and forth in our program so that different functions could all see the request. However we know that we do not want to alter the request, so a smarter way would be to put this data on display so that everyone could read the data, but nobody could alter it.

```rust
let request = /* Get request from user as string */;

// The '&' signalizes that we're borrowing immutably
let uri = get_uri_from_request(&request);
let user_agent = get_user_agent_from_request(&request);
let http_ver = get_http_ver_from_request(&request);
```
Here we borrow immutably by using the `&` infront of the variable. We're always the owner of the variable, however we're also sure that none of the function calls alter the request, because they are not allowed by [Rust][1]. If we try to alter the request in the functions, Rust won't compile our code. This prevents us from making errors in the implementation.

### Keeping statistics

To let our server keep statistics over how many people gets data from our webserver, we can keep an object that has a counter based on which resource the user has requested. By passing this object to the request handling function as a mutable borrow, we can let that function increment the right statistics based on the request. This could look something like this:

```rust
let mut statistics = /* Initial statistics object */;
loop {
  let request = /* Get or wait for next request */;

  // We temporary give away ownership
  // by letting borrower be able to change it
  handle_request(&request, &mut statistics)
  // We get back ownership, so we can give it away
  // on the next request
}
```

Here we see two new words which we haven't seen before; `mut` and `loop`. `loop` is very simple because it just loops forever, just like a `while(true){}`-loop. `mut` means that something is mutable (alterable). The default in Rust is that all variables are immutable, so once declared, they cannot be altered. This makes us choose immutable data on purpose, which is beneficial because this eliminates errors where data is changed unpurposefully.

Where we actually borrow mutably is where we have `&mut statistics`. Here we tell Rust that we want `handle_request` to have ownership of statistics temporarily and be able to alter it. This means that we cannot use this variable until `handle_request` gives it back.

## My advice to you

I thoroughly belive that learning Rust will make you a better programmer overall. Whenever you write programs, no matter the language, the concepts behind Rust will let you avoid the multitude of memory errors that can occur in an average program. The best way to get fluent in memory management is to give [Rust][1] a spin by learning the language. This language is highly modern and is evolving rapidly. No matter if you start working with this language in the future, the lessons and concepts you learn will stay with you in other languages.  

This language has so many cool features, and its one of the fastest languages out there! Some of the coolest features of [Rust][1] are:

 - Zero-cost abstractions
 - Move semantics
 - Guaranteed memory safety
 - Threads without data races
 - Trait-based generics
 - Pattern matching
 - Type inference
 - Efficient C bindings

This is currently my favorite language, and you will certainly see more blogposts about it. The ownership rules is certainly the most distinct feature of [Rust][1], however so many of the other features are just brilliant. So if you're looking for a new, safe, fast and simple language, checkout [Rust][1].

[1]: https://rust-lang.org/
[2]: https://thesocietea.org/2017/01/programming-concepts-garbage-collection/
[3]: https://doc.rust-lang.org/book/second-edition/ch04-01-what-is-ownership.html
[4]: https://doc.rust-lang.org/book/first-edition/the-stack-and-the-heap.html
[5]: https://doc.rust-lang.org/book/second-edition/
