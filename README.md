# Conways-GameofLife

[Play it Here](https://blinfoldking.github.io/Conways-GameofLife/)

a simple cellular automaton devised by John Horton Conway simulating how a population interact with each other. This is a "zero player" game, and the outcome is determined with the initial state or configuration, and for every node (Cell) in the grid follow the following set of rules :

* Any living Node or Cell with fewer than two neighbors dies, by solitude (under population)
 * Any living Node or Cell with two or three neighbors continue to live
 * Any living Node or Cell with more than three neighbors dies, by Overpopulation
 * Any dead Node or Cell with three living neighbors becomes a living Node or Cell