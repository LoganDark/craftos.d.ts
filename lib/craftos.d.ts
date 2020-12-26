/**
 * Copyright (c) 2020 LoganDark
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

declare const _HOST: string
declare const _VERSION: 'Lua 5.1'

// LUA 5.1 /////////////////////////////////////////////////////////////////////

/** Issues an error when the value of its argument v is false (i.e., nil or false); otherwise, returns all its arguments. message is an error message; when absent, it defaults to "assertion failed!" */
declare function assert(this: void, condition: undefined | false, message?: string): never
/** Issues an error when the value of its argument v is false (i.e., nil or false); otherwise, returns all its arguments. message is an error message; when absent, it defaults to "assertion failed!" */
declare function assert<T>(this: void, condition: T, message?: string): T

/** Opens the named file and executes its contents as a Lua chunk. When called without arguments, dofile executes the contents of the standard input (stdin). Returns all values returned by the chunk. In case of errors, dofile propagates the error to its caller (that is, dofile does not run in protected mode). */
declare function dofile(this: void, filename?: string): any

/**
 * Terminates the last protected function called and returns message as the error message. Function error never returns.
 * Usually, error adds some information about the error position at the beginning of the message. The level argument specifies how to get the error position. With level 1 (the default), the error position is where the error function was called. Level 2 points the error to where the function that called error was called; and so on. Passing a level 0 avoids the addition of error position information to the message.
 */
declare function error(this: void, message: string, level?: number): never

/** Returns the current environment in use by the function. f is a Lua function. */
declare function getfenv(this: void, f: (...args: any) => any): object
/** Returns the current environment in use by the function. f is a number that specifies the function at that stack level: Level 1 is the function calling getfenv. If f is 0, getfenv returns the global environment. The default for f is 1. */
declare function getfenv(this: void, l?: number): object

/**
 * Sets the environment to be used by the given function. f can be a Lua function that specifies the function. setfenv returns the given function.
 * As a special case, when f is 0 setfenv changes the environment of the running thread. In this case, setfenv returns no values.
 */
declare function setfenv(this: void, f: (...args: any) => any, table: object): typeof f
/**
 * Sets the environment to be used by the given function. f can be a number that specifies the function at that stack level: Level 1 is the function calling setfenv. setfenv returns the given function.
 * As a special case, when f is 0 setfenv changes the environment of the running thread. In this case, setfenv returns no values.
 */
declare function setfenv(this: void, l: number, table: object): (...args: any) => any

/** If object does not have a metatable, returns nil. Otherwise, if the object's metatable has a "__metatable" field, returns the associated value. Otherwise, returns the metatable of the given object. */
declare function getmetatable(this: void, object: any): any

/**
 * Sets the metatable for the given table. (You cannot change the metatable of other types from Lua, only from C.) If metatable is nil, removes the metatable of the given table. If the original metatable has a "__metatable" field, raises an error.
 * This function returns table.
 */
declare function setmetatable(this: void, table: any, metatable: object | undefined): typeof table

/**
 * Loads a chunk using function func to get its pieces. Each call to func must return a string that concatenates with previous results. A return of an empty string, nil, or no value signals the end of the chunk.
 * If there are no errors, returns the compiled chunk as a function; otherwise, returns nil plus the error message. The environment of the returned function is the global environment.
 * chunkname is used as the chunk name for error messages and debug information. When absent, it defaults to "=(load)".
 * @tupleReturn */
declare function load(this: void, func: (this: void) => string, chunkname?: string): [(...args: any) => any] | [undefined, string]

/** Similar to load, but gets the chunk from file filename or from the standard input, if no file name is given.
 * @tupleReturn */
declare function loadfile(this: void, filename?: string): [(...args: any) => any] | [undefined, string]

/**
 * Similar to load, but gets the chunk from the given string.
 * To load and run a given string, use the idiom
 * ```
 * assert(loadstring(s))()
 * ```
 * When absent, chunkname defaults to the given string.
 * @tupleReturn */
declare function loadstring(this: void, string: string, chunkname?: string): [(...args: any) => any] | [undefined, string]

///** Calls function f with the given arguments in protected mode. This means that any error inside f is not propagated; instead, pcall catches the error and returns a status code. Its first result is the status code (a boolean), which is true if the call succeeds without errors. In such case, pcall also returns all results from the call, after this first result. In case of any error, pcall returns false plus the error message.
// * @tupleReturn */
//declare function pcall<F extends (...args: any) => any>(this: void, f: F, ...args: Parameters<F>): [true, ReturnType<F>] | [false, string]

/** Receives any number of arguments, and prints their values to stdout, using the tostring function to convert them to strings. print is not intended for formatted output, but only as a quick way to show a value, typically for debugging. For formatted output, use string.format. */
declare function print(this: void, ...args: any): void

/** Checks whether v1 is equal to v2, without invoking any metamethod. Returns a boolean. */
declare function rawequal<A, B>(this: void, v1: A, v2: B): boolean

/** Gets the real value of table[index], without invoking any metamethod. table must be a table; index may be any value. */
declare function rawget<T extends object, K extends keyof T>(this: void, table: T, index: K): T[K]

/**
 * Sets the real value of table[index] to value, without invoking any metamethod. table must be a table, index any value different from nil, and value any Lua value.
 * This function returns table.
 */
declare function rawset<T extends object, K extends keyof T>(this: void, table: T, index: K, value: T[K]): T

/** If index is a number, returns all arguments after argument number index. Otherwise, index must be the string "#", and select returns the total number of extra arguments it received.
 * @tupleReturn */
declare function select(this: void, index: '#' | number, ...args: any[]): any[]

/**
 * Tries to convert its argument to a number. If the argument is already a number or a string convertible to a number, then tonumber returns this number; otherwise, it returns nil.
 * An optional argument specifies the base to interpret the numeral. The base may be any integer between 2 and 36, inclusive. In bases above 10, the letter 'A' (in either upper or lower case) represents 10, 'B' represents 11, and so forth, with 'Z' representing 35. In base 10 (the default), the number can have a decimal part, as well as an optional exponent part (see §2.1). In other bases, only unsigned integers are accepted.
 */
declare function tonumber(this: void, value: string, base?: number): number | undefined

/**
 * Receives an argument of any type and converts it to a string in a reasonable format. For complete control of how numbers are converted, use string.format.
 * If the metatable of e has a "__tostring" field, then tostring calls the corresponding value with e as argument, and uses the result of the call as its result.
 */
declare function tostring(this: void, value: any): string

/** Writes characters to the terminal screen. Applies word-wrap, unlike term.write(). */
declare function write(this: void, arg: any): void

// CC:TWEAKED //////////////////////////////////////////////////////////////////

/** The ComputerCraft and Minecraft version of the current computer environment. */
declare const _CC_DEFAULT_SETTINGS: string

/** Pauses execution for the specified number of seconds. */
declare function sleep(this: void, time: number): void

/** Prints the specified values to the screen in red, separated by spaces, wrapping if necessary. */
declare function printError(this: void, ...args: any): void

// GLOBAL MODULES //////////////////////////////////////////////////////////////

declare const bit: {
	/** Shifts a number left by a specified number of bits. */
	blshift(this: void, n: number, bits: number): number

	/** Shifts a number right arithmetically by a specified number of bits. */
	brshift(this: void, n: number, bits: number): number

	/** Shifts a number right logically by a specified number of bits. */
	blogic_rshift(this: void, n: number, bits: number): number

	/** Computes the bitwise exclusive OR of two numbers. */
	bxor(this: void, m: number, n: number): number

	/** Computes the bitwise inclusive OR of two numbers. */
	bor(this: void, m: number, n: number): number

	/** Computes the bitwise AND of two numbers. */
	band(this: void, m: number, n: number): number

	/** Computes the bitwise NOT of a number. */
	bnot(this: void, n: number): number
}

declare namespace colors {
	type Color = number
	type ColorSet = number
}

declare const colors: {
	/** Combines one or more colors (or sets of colors) into a larger set.
	 * @vararg */
	combine(this: void, ...colors: colors.Color[]): colors.ColorSet

	/** Removes one or more colors (or sets of colors) from an initial set.
	 * @vararg */
	subtract(this: void, set: colors.ColorSet, ...colors: colors.Color[]): colors.ColorSet

	/** Tests whether color is contained within colors. */
	test(this: void, set: colors.ColorSet, color: colors.Color): boolean

	/** Combine a three-color RGB value into one hexadecimal representation. */
	packRGB(this: void, r: number, g: number, b: number): number

	/** Separate a hexadecimal RGB color into its three constituent channels.
	 * @tupleReturn */
	unpackRGB(this: void, rgb: number): [number, number, number]

	white: colors.Color
	orange: colors.Color
	magenta: colors.Color
	lightBlue: colors.Color
	yellow: colors.Color
	lime: colors.Color
	pink: colors.Color
	gray: colors.Color
	lightGray: colors.Color
	cyan: colors.Color
	purple: colors.Color
	blue: colors.Color
	brown: colors.Color
	green: colors.Color
	red: colors.Color
	black: colors.Color
}

declare namespace command {
	type TaskID = number

	/** Contains the block state info for the block being observed. For example, a log of wood's state table contains the keys "variant" (which may be set to eg "oak"), and "axis" (which may be set to eg "y", indicating an upright orientation). */
	interface BlockState {
		[key: string]: string
	}

	/** A table containing info about the block at the specified world location. */
	interface BlockInfo {
		state: BlockState,
		name: string,
		metadata: number
	}
}

declare const command: {
	/** Executes the specified command, yields until the result is determined, then returns it.
	 * @tupleReturn */
	exec(this: void, command: string): [boolean, string[]]

	/** Executes the specified command, but doesn't yield. Queues a "task_complete" event after the command is executed. */
	execAsync(this: void, command: string): command.TaskID

	/** Returns a numerically indexed table filled with strings representing acceptable commands for commands.exec() / commands.execAsync(). */
	list(this: void): string[]

	/** Returns the Minecraft world coordinates of the computer running the command.
	 * @tupleReturn */
	getBlockPosition(this: void): [number, number, number]

	/** Returns the Minecraft world coordinates of the computer running the command. */
	getBlockInfo(this: void, x: number, y: number, z: number): command.BlockInfo

	/**
	 * Available only to Command Computers, returns a numerically-indexed table containing information on the blocks within the specified world co-ordinates. Each sub-table is formatted per the output of commands.getBlockInfo().
	 * A maximum of 4096 (2^12) blocks may be inspected at a time (for example, a 16x16x16 cube); the function will error if the block count exceeds this.
	 * The blocks are returned in the order of lowest x-co-ord to highest x-co-ord, then lowest z-co-ord to highest z-co-ord, then lowest y-co-ord to highest y-co-ord; that is to say, west to east, then north to south, then lowest altitude to highest altitude. */
	getBlocksInfo(this: void, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number): command.BlockInfo[]
}

type coroutine = {readonly '': unique symbol}

declare namespace coroutine {
	type Status = 'running' | 'suspended' | 'normal' | 'dead'

	/** @tupleReturn */
	type Resumer<T extends (...args: any) => any> = (...args: Parameters<T>) => any[]
}

declare const coroutine: {
	/** Creates a new coroutine. */
	create(this: void, f: Function): coroutine

	/** Starts or resumes a coroutine.
	 * @vararg @tupleReturn */
	resume(this: void, coro: coroutine, ...values: any[]): [true, ...any[]] | [false, string]

	/** Returns the currently executing coroutine. */
	running(this: void): coroutine

	/** Returns the status of coro. */
	status(this: void, coro: coroutine): coroutine.Status

	/** Creates a new coroutine and wraps it in a function. */
	wrap<T extends (...args: any) => any>(this: void, f: T): coroutine.Resumer<T>

	/** Pauses the currently executing coroutine and passes control to its caller.
	 * @vararg @tupleReturn */
	yield(this: void, ...args: any): any[]
}

declare type Side = 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'

declare namespace disk {
	/** A floppy disk's unique ID number. */
	type DiskID = number
}

declare const disk: {
	/** Checks whether any item is in a disk drive. */
	isPresent(this: void, side: peripheral.Name): boolean

	/** Checks whether a Floppy Disk is in a disk drive. */
	hasData(this: void, side: peripheral.Name): boolean

	/** Gets the directory name where the contents of the floppy disk can be accessed. */
	getMountPath(this: void, side: peripheral.Name): string | undefined

	/** Sets the floppy disk's label. */
	setLabel(this: void, side: peripheral.Name, label: string): void

	/** Gets the floppy disk's label. */
	getLabel(this: void, side: peripheral.Name): string | undefined

	/** Gets the floppy disk's unique ID number. */
	getID(this: void, side: peripheral.Name): disk.DiskID | undefined

	/** Checks whether a music disk is in the drive. */
	hasAudio(this: void, side: peripheral.Name): boolean

	/** Gets the title of the music disc in the drive. */
	getAudioTitle(this: void, side: peripheral.Name): string | undefined

	/** Starts playing the music disc in the drive. */
	playAudio(this: void, side: peripheral.Name): void

	/** Stops playing the music disc in the drive. */
	playAudio(this: void, side: peripheral.Name): void

	/** Ejects any item currently in the drive, spilling it into the world as a loose item. */
	eject(this: void, side: peripheral.Name): void

	// CRAFTOS-PC //////////////////////////////////////////////////////////////

	/**
	 * Replaces the loaded disk with the specified resource.
	 * @param path Either a disk ID or path to load.
	 * If number: Mounts the floppy disk (<save dir>/computer/disk/<id>) to /disk[n]
	 * If path to directory: Mounts the real path specified to /disk[n]
	 * If path to file: Loads the file as an audio disc (use disk.playAudio or the "dj" command) */
	insertDisk(this: void, path: string | number): void
}

declare namespace fs {
	type OpenMode = 'r' | 'w' | 'a' | 'rb' | 'wb' | 'ab'

	interface File {
		/** Closes the file handle, after which it can no longer be used */
		close(this: void): void
	}

	interface FileRead extends File {
		/** Reads the next line from the file */
		readLine(this: void): string | undefined

		/** Reads the all the text in the file */
		readAll(this: void): string
	}

	interface FileReadBinary extends File {
		/** Reads a single byte from the file and returns it */
		read(this: void): number | undefined
	}

	interface FileWrite extends File {
		/** Writes a string of characters to the file exactly as they appear in the string data */
		write(this: void, data: string): void

		/** Writes a string of characters to the file, then appends an end-of-line character */
		writeLine(this: void, line: string): void

		/** Flushes the data to the specified file. (keeps the handle available afterwards) */
		flush(this: void): void
	}

	interface FileWriteBinary extends File {
		/** Writes a single byte into the file */
		write(this: void, byte: number): void
	}

	// CC:TWEAKED //////////////////////////////////////////////////////////////

	interface Attributes {
		size: number
		isDir: boolean
		created: number
		modified: number
	}
}

declare const fs: {
	/** Returns a list of all the files (including subdirectories but not their contents) contained in a directory, as a numerically indexed table. */
	list(this: void, path: string): string[]

	/** Checks if a path refers to an existing file or directory. */
	exists(this: void, path: string): boolean

	/** Checks if a path refers to an existing directory. */
	isDir(this: void, path: string): boolean

	/** Checks if a path is read-only (i.e. cannot be modified). */
	isReadOnly(this: void, path: string): boolean

	/** Gets the final component of a pathname. */
	getName(this: void, path: string): string

	/** Gets the storage medium holding a path, or nil if the path does not exist. */
	getDrive(this: void, path: string): string | undefined

	/** Gets the size of a file in bytes. */
	getSize(this: void, path: string): number

	/** Gets the remaining space on the drive containing the given directory. */
	getFreeSpace(this: void, path: string): number

	/** Makes a directory. */
	makeDir(this: void, path: string): void

	/** Moves a file or directory to a new location. */
	move(this: void, fromPath: string, toPath: string): void

	/** Copies a file or directory to a new location. */
	copy(this: void, fromPath: string, toPath: string): void

	/** Deletes a file or directory. */
	'delete'(this: void, path: string): void

	/** Combines two path components, returning a path consisting of the local path nested inside the base path. */
	combine(this: void, basePath: string, localPath: string): string

	/** Opens a file so it can be read. */
	open(this: void, path: string, mode: 'r'): fs.FileRead

	/** Opens a file so it can be written. */
	open(this: void, path: string, mode: 'w' | 'a'): fs.FileWrite

	/** Opens a file so it can be read. */
	open(this: void, path: string, mode: 'rb'): fs.FileReadBinary

	/** Opens a file so it can be written. */
	open(this: void, path: string, mode: 'wb' | 'ab'): fs.FileWriteBinary

	/** Searches the computer's files using wildcards. */
	find(this: void, wildcard: string): fs.File[]

	/** Returns the parent directory of path. */
	getDir(this: void, path: string): string

	/** Returns a list of strings that could be combined with the provided name to produce valid entries in the specified folder. */
	complete(
		this: void,
		partialName: string,
		ancestry: string,
		includeFiles?: boolean,
		includeSlashes?: boolean
	): string[]

	// CC:TWEAKED //////////////////////////////////////////////////////////////

	/** Returns true if a path is mounted to the parent filesystem. */
	isDriveRoot(this: void, path: string): boolean

	/** Returns this drive's capacity. This will be nil for "read-only" drives, such as the ROM or treasure disks. */
	getCapacity(this: void, path: string): boolean

	/** Get attributes about a specific file or folder. */
	attributes(this: void, path: string): fs.Attributes
}

declare const gps: {
	/** Tries to retrieve the computer or turtles own location. On success, returns the location of the turtle’s modem. On failure (if no responses are received for timeout seconds, by default 2), returns nil. If debug is true, debug messages are printed.
	 * @tupleReturn */
	locate(this: void, timeout: number, debug?: boolean): [number, number, number] | [undefined]
}

declare const help: {
	/** Returns the list of locations the API will look in for help files. This is returned in the form of a string containing multiple search paths separated by colons. */
	path(this: void): string

	/** Sets the list of locations the API will look in for help files. This should be a string containing one or more search paths separated by colons. */
	setPath(this: void, path: string): void

	/** Returns the path to the file containing the help page for topic, or nil if the topic cannot be found. */
	lookup(this: void, topic: string): string | undefined

	/** Returns a list of all available help topics. */
	topics(this: void): string[]

	/** Returns a list of suffixes that can be concatenated with the prefix to get valid topic titles. */
	completeTopic(this: void, prefix: string): string[]
}

declare namespace http {
	interface Response extends fs.FileRead {
		/** Returns the numerical HTTP response code sent by the server */
		getResponseCode(this: void): number
	}

	interface CpcRequest extends fs.FileRead {
		/** Returns the URI endpoint of the request */
		getURL(this: void): string

		/** Returns the HTTP method of the request */
		getMethod(this: void): string

		/** Returns a table of headers sent by the client */
		getRequestHeaders(this: void): Map<string, string>
	}

	interface CpcResponse extends fs.FileWrite {
		/** Sets the HTTP response code to send */
		setStatusCode(this: void, code: number): void

		/** Sets a header value to send */
		setResponseHeader(this: void, key: string, value: string): void
	}
}

declare const http: {
	/** Sends a HTTP request to a website, asynchronously. */
	request(this: void, url: string, postData?: string, headers?: Map<string, string>): void

	/** Sends a HTTP GET request to a website, synchronously. */
	get(this: void, url: string, headers?: Map<string, string>): http.Response

	/** Sends a HTTP POST request to a website, synchronously. */
	post(this: void, url: string, postData?: string, headers?: Map<string, string>): http.Response

	/** Checks if a URL is valid and is included in the HTTP whitelist.
	 * @tupleReturn */
	checkURL(this: void, url: string): [true] | [false, string]

	////////////////////////////////////////////////////////////////////////////

	/** Adds a listener on a port. */
	addListener(this: void, port: number): void

	/** Frees a port to be listened on again later. */
	removeListener(this: void, port: number): void

	/** Starts a server on a port and calls a function when a request is made. */
	listen(this: void, port: number, callback: (req: http.CpcRequest, res: http.CpcResponse) => void): void
}

declare namespace io {
	interface file {
		/** Closes file. Note that files are automatically closed when their handles are garbage collected, but that takes an unpredictable amount of time to happen.
		 * @tupleReturn */
		close(): [any] | [undefined, string]

		/** Saves any written data to file.
		 * @tupleReturn */
		flush(): [any] | [undefined, string]

		/**
		 * Returns an iterator function that, each time it is called, returns a new line from the file. Therefore, the construction
		 * ```
		 * for line in file:lines() do body end
		 * ```
		 * will iterate over all lines of the file. (Unlike io.lines, this function does not close the file when the loop ends.)
		 * @tupleReturn */
		lines(): [Iterator<string>] | [undefined, string]

		/**
		 * Reads the file file, according to the given formats, which specify what to read. For each format, the function returns a string (or a number) with the characters read, or nil if it cannot read data with the specified format. When called without formats, it uses a default format that reads the entire next line (see below).
		 * The available formats are
		 * - "*l": reads the next line (skipping the end of line), returning nil on end of file. This is the default format.
		 *
		 * @vararg @tupleReturn */
		read(format?: '*l'): [string] | [undefined, string]

		/** Writes the value of its argument to the file. The argument must be a string or number. To write other values, use tostring or string.format before write.
		 * @tupleReturn */
		write(value: string | number): [any] | [undefined, string]
	}
}

declare const io: {
	/** Equivalent to file:close(). Without a file, closes the default output file.
	 * @tupleReturn */
	close(this: void, file?: io.file): [any] | [undefined, string]

	/** Equivalent to file:flush over the default output file.
	 * @tupleReturn */
	flush(this: void,): [any] | [undefined, string]

	/**
	 * Opens the named file (in text mode), and sets its handle as the default input file.
	 * In case of errors this function raises the error, instead of returning an error code. */
	input(this: void, filename: string): void

	/**
	 * Sets this file handle as the default input file.
	 * In case of errors this function raises the error, instead of returning an error code. */
	input(this: void, file: io.file): void

	/**
	 * Returns the current default input file.
	 * In case of errors this function raises the error, instead of returning an error code. */
	input(this: void): io.file

	/**
	 * Opens the given file name in read mode and returns an iterator function that, each time it is called, returns a new line from the file. Therefore, the construction
	 * ```
	 * for line in io.lines(filename) do body end
	 * ```
	 * will iterate over all lines of the file. When the iterator function detects the end of file, it returns nil (to finish the loop) and automatically closes the file.
	 * The call io.lines() (with no file name) is equivalent to io.input():lines(); that is, it iterates over the lines of the default input file. In this case it does not close the file when the loop ends.
	 * @tupleReturn */
	lines(this: void, filename?: string): [Iterator<string>] | [undefined, string]

	/**
	 * This function opens a file, in the mode specified in the string mode. It returns a new file handle, or, in case of errors, nil plus an error message.
	 * The mode string can be any of the following:
	 * - "r": read mode (the default);
	 * - "w": write mode;
	 * - "a": append mode;
	 *
	 * The mode string can also have a 'b' at the end, which is needed in some systems to open the file in binary mode. This string is exactly what is used in the standard C function fopen.
	 * @tupleReturn */
	open(
		this: void,
		filename: string,
		mode?: 'r' | 'w' | 'a' |
			'rb' | 'wb' | 'ab'
	): [io.file] | [undefined, string]

	/** Similar to io.input, but operates over the default output file. */
	output(this: void, filename: string): void

	/** Similar to io.input, but operates over the default output file. */
	output(this: void, file: io.file): void

	/** Similar to io.input, but operates over the default output file. */
	output(this: void): io.file

	/** Equivalent to io.input():read.
	 * @vararg @tupleReturn */
	read(this: void, format?: '*l'): [string] | [undefined, string]

	/** Checks whether obj is a valid file handle. Returns the string "file" if obj is an open file handle, "closed file" if obj is a closed file handle, or nil if obj is not a file handle. */
	type(this: void, obj: any): 'file' | 'closed file' | undefined

	/** Equivalent to io.output():write.
	 * @tupleReturn */
	write(this: void, value: string | number): [any] | [undefined, string]
}

declare namespace keys {
	type KeyCode = number
}

declare const keys: {
	/** Translates a numerical key code to a human-readable name. */
	getName(this: void, code: keys.KeyCode): string | undefined

	one: keys.KeyCode
	two: keys.KeyCode
	three: keys.KeyCode
	four: keys.KeyCode
	five: keys.KeyCode
	six: keys.KeyCode
	seven: keys.KeyCode
	eight: keys.KeyCode
	nine: keys.KeyCode
	zero: keys.KeyCode
	minus: keys.KeyCode
	equals: keys.KeyCode
	backspace: keys.KeyCode
	tab: keys.KeyCode
	q: keys.KeyCode
	w: keys.KeyCode
	e: keys.KeyCode
	r: keys.KeyCode
	t: keys.KeyCode
	y: keys.KeyCode
	u: keys.KeyCode
	i: keys.KeyCode
	o: keys.KeyCode
	p: keys.KeyCode
	leftBracket: keys.KeyCode
	rightBracket: keys.KeyCode
	enter: keys.KeyCode
	leftCtrl: keys.KeyCode
	a: keys.KeyCode
	s: keys.KeyCode
	d: keys.KeyCode
	f: keys.KeyCode
	g: keys.KeyCode
	h: keys.KeyCode
	j: keys.KeyCode
	k: keys.KeyCode
	l: keys.KeyCode
	semiColon: keys.KeyCode
	apostrophe: keys.KeyCode
	grave: keys.KeyCode
	leftShift: keys.KeyCode
	backslash: keys.KeyCode
	z: keys.KeyCode
	x: keys.KeyCode
	c: keys.KeyCode
	v: keys.KeyCode
	b: keys.KeyCode
	n: keys.KeyCode
	m: keys.KeyCode
	comma: keys.KeyCode
	period: keys.KeyCode
	slash: keys.KeyCode
	rightShift: keys.KeyCode
	multiply: keys.KeyCode
	leftAlt: keys.KeyCode
	space: keys.KeyCode
	capsLock: keys.KeyCode
	f1: keys.KeyCode
	f2: keys.KeyCode
	f3: keys.KeyCode
	f4: keys.KeyCode
	f5: keys.KeyCode
	f6: keys.KeyCode
	f7: keys.KeyCode
	f8: keys.KeyCode
	f9: keys.KeyCode
	f10: keys.KeyCode
	numLock: keys.KeyCode
	scollLock: keys.KeyCode
	numPad7: keys.KeyCode
	numPad8: keys.KeyCode
	numPad9: keys.KeyCode
	numPadSubtract: keys.KeyCode
	numPad4: keys.KeyCode
	numPad5: keys.KeyCode
	numPad6: keys.KeyCode
	numPadAdd: keys.KeyCode
	numPad1: keys.KeyCode
	numPad2: keys.KeyCode
	numPad3: keys.KeyCode
	numPad0: keys.KeyCode
	numPadDecimal: keys.KeyCode
	f11: keys.KeyCode
	f12: keys.KeyCode
	f13: keys.KeyCode
	f14: keys.KeyCode
	f15: keys.KeyCode
	kana: keys.KeyCode
	convert: keys.KeyCode
	noconvert: keys.KeyCode
	yen: keys.KeyCode
	numPadEquals: keys.KeyCode
	cimcumflex: keys.KeyCode
	at: keys.KeyCode
	colon: keys.KeyCode
	underscore: keys.KeyCode
	kanji: keys.KeyCode
	stop: keys.KeyCode
	ax: keys.KeyCode
	numPadEnter: keys.KeyCode
	rightCtrl: keys.KeyCode
	numPadComma: keys.KeyCode
	numPadDivide: keys.KeyCode
	rightAlt: keys.KeyCode
	pause: keys.KeyCode
	home: keys.KeyCode
	up: keys.KeyCode
	pageUp: keys.KeyCode
	left: keys.KeyCode
	right: keys.KeyCode
	end: keys.KeyCode
	down: keys.KeyCode
	pageDown: keys.KeyCode
	insert: keys.KeyCode
	'delete': keys.KeyCode
}

declare const math: {
	/** Returns the absolute value of x. */
	abs(this: void, x: number): number

	/** Returns the arc cosine of x (in radians). */
	acos(this: void, x: number): number

	/** Returns the arc sine of x (in radians). */
	asin(this: void, x: number): number

	/** Returns the arc tangent of x (in radians). */
	atan(this: void, x: number): number

	/** Returns the arc tangent of y/x (in radians), but uses the signs of both parameters to find the quadrant of the result. (It also handles correctly the case of x being zero.) */
	atan2(this: void, y: number, x: number): number

	/** Returns the smallest integer larger than or equal to x. */
	ceil(this: void, x: number): number

	/** Returns the cosine of x (assumed to be in radians). */
	cos(this: void, x: number): number

	/** Returns the hyperbolic cosine of x. */
	cosh(this: void, x: number): number

	/** Returns the angle x (given in radians) in degrees. */
	deg(this: void, x: number): number

	/** Returns the value ex. */
	exp(this: void, x: number): number

	/** Returns the largest integer smaller than or equal to x. */
	floor(this: void, x: number): number

	/** Returns the remainder of the division of x by y that rounds the quotient towards zero. */
	fmod(this: void, x: number, y: number): number

	/** Returns m and e such that x = m2e, e is an integer and the absolute value of m is in the range [0.5, 1) (or zero when x is zero). */
	frexp(this: void, x: number): number

	/** The value HUGE_VAL, a value larger than or equal to any other numerical value. */
	huge: number

	/** Returns m2e (e should be an integer). */
	ldexp(this: void, m: number, e: number): number

	/** Returns the natural logarithm of x. */
	log(this: void, x: number): number

	/** Returns the base-10 logarithm of x. */
	log10(this: void, x: number): number

	/** Returns the maximum value among its arguments.
	 * @vararg */
	max(this: void, ...numbers: number[]): number

	/** Returns the minimum value among its arguments.
	 * @vararg */
	min(this: void, ...numbers: number[]): number

	/** Returns two numbers, the integral part of x and the fractional part of x.
	 * @tupleReturn */
	modf(this: void, x: number): [number, number]

	/** The value of pi. */
	pi: number

	/** Returns xy. (You can also use the expression x^y to compute this value.) */
	pow(this: void, x: number, y: number): number

	/** Returns the angle x (given in degrees) in radians. */
	rad(this: void, x: number): number

	/**
	 * This function is an interface to the simple pseudo-random generator function rand provided by ANSI C. (No guarantees can be given for its statistical properties.)
	 * When called without arguments, returns a uniform pseudo-random real number in the range [0,1). When called with an integer number m, math.random returns a uniform pseudo-random integer in the range [1, m]. When called with two integer numbers m and n, function random returns a uniform pseudo-random integer in the range [m, n]. */
	random(this: void, m?: number, n?: number): number

	/** Sets x as the "seed" for the pseudo-random generator: equal seeds produce equal sequences of numbers. */
	randomseed(this: void, x: number): void

	/** Returns the sine of x (assumed to be in radians). */
	sin(this: void, x: number): number

	/** Returns the hyperbolic sine of x. */
	sinh(this: void, x: number): number

	/** Returns the square root of x. (You can also use the expression x^0.5 to compute this value.) */
	sqrt(this: void, x: number): number

	/** Returns the tangent of x (assumed to be in radians). */
	tan(this: void, x: number): number

	/** Returns the hyperbolic tangent of x. */
	tanh(this: void, x: number): number
}

declare namespace multishell {
	type TabID = number
}

declare const multishell: {
	/** Returns the ID of the currently running tab. */
	getCurrent(this: void): multishell.TabID

	/** Returns the number of tabs currently being handled by the multishell system. */
	getCount(this: void): number

	/** Launches the specified script in a new tab.
	 * @vararg */
	launch(this: void, environment: Map<string, any>, programPath: string, ...arguments: string[]): multishell.TabID

	/** Switches focus to the specified tab. */
	setFocus(this: void, tabID: multishell.TabID): boolean

	/** Relabels the specified tab to use the specified title. */
	setTitle(this: void, tabID: multishell.TabID, title: string): void

	/** Returns the title of the specified tab. */
	getTitle(this: void, tabID: multishell.TabID): string

	/** Returns the ID of the currently focused tab. */
	getFocus(this: void): multishell.TabID
}

declare namespace os {
	type TimerID = number;
	type AlarmID = number;

	type Events = {
		/** Fired when text is typed on the keyboard */
		char: [string]
		/** Fired when a key is pressed on the keyboard */
		key: [keys.KeyCode, boolean]
		/** Fired when a key is released */
		key_up: [keys.KeyCode]
		/** Fired when Ctrl + V is pressed on the keyboard */
		paste: [string]
		/** Fired when a timeout started by os.startTimer() completes */
		timer: [TimerID]
		/** Fired when a time passed to os.setAlarm() is reached */
		alarm: [AlarmID]
		/** Fired when an asynchronous task completes. Used by every commands API method internally which yields, including commands.execAsync(), but excluding commands.getBlockPosition(). Also used internally by every command block's method. */
		task_complete: [command.TaskID, true, undefined, ...any] | [number, false, string]
		/** Fired when the state of any of the redstone inputs change */
		redstone: []
		/**
		 * Fired when a combination of keys CTRL and T is pressed and held for three seconds.
		 * You will not normally see this event, as it is handled inside os.pullEvent.
		 */
		terminate: []
		/** Fired when a disk is inserted into an adjacent disk drive */
		disk: [peripheral.Name]
		/** Fired when a disk is removed from an adjacent disk drive */
		disk_eject: [peripheral.Name]
		/** Fired when peripheral is attached */
		peripheral: [peripheral.Name]
		/** Fired when peripheral is removed */
		peripheral_detach: [peripheral.Name]
		/** Fired when a rednet message is received from the rednet API */
		rednet_message: [number, any, string]
		/** Fired when a modem message is received from the modem */
		modem_message: [peripheral.Name, number, number, any, number]
		/**
		 * Fired when an attempt to receive text from / post text on a website is successful.
		 * You will not normally see this event as it is handled inside http.get.
		 */
		http_success: [string, string[]]
		/**
		 * Fired when an attempt to receive text from / post text on a website is unsuccessful
		 * You will not normally see this event as it is handled inside http.get.
		 */
		http_failure: [string]
		/** Fired when a mouse button is pressed */
		mouse_click: [number, number, number]
		/** Fired when a mouse button is released */
		mouse_up: [number, number, number]
		/** Fired when a mousewheel is scrolled. */
		mouse_scroll: [number, number, number]
		/** Fired when the mouse is moved after clicking. */
		mouse_drag: [number, number, number]
		/** Fired when a player right clicks on a connected advanced monitor. */
		monitor_touch: [peripheral.Name, number, number]
		/** Fired when a connected monitor resizes. */
		monitor_resize: [peripheral.Name]
		/** Fired when the terminal resizes. */
		term_resize: []
		/** Fired when the inventory on a Turtle is changed. */
		turtle_inventory: []

		// CC:TWEAKED //////////////////////////////////////////////////////////

		// TODO

		// CRAFTOS-PC //////////////////////////////////////////////////////////

		/** Sent when an HTTP request is made. */
		http_request: [number, http.CpcRequest, http.CpcResponse]
		/** Send this inside an http.listen() callback to stop the server */
		server_stop: []
	}
}

declare const os: {
	/** Returns the version of the OS the computer is running, which (for CraftOS) also contains the version of ComputerCraft. */
	version(this: void): string

	/** Returns the unique ID of this computer. os.computerID() also behaves exactly the same as os.getComputerID(). */
	getComputerID(this: void): number

	/** Returns the label of this computer. os.computerLabel() also behaves exactly the same as os.getComputerLabel(). */
	getComputerLabel(this: void): string | undefined

	/** Set the label of this computer. */
	setComputerLabel(this: void, label: string | undefined): void

	/** An advanced way of starting programs. A started program will have a given environment table which determines what functions it has available, as well as any variables it will be able to access by default. You may prefer to use the Shell (API) unless you need to do something special.
	 * @vararg */
	run(this: void, environment: Map<string, any>, programPath: string, ...arguments: string[]): boolean

	/** Loads a Lua script as an API in its own namespace. It will be available to all programs that run on the terminal. */
	loadAPI(this: void, path: string): boolean

	/** Unloads a previously loaded API. */
	unloadAPI(this: void, name: string): void

	/** Blocks until the computer receives an event, or if target-event is specified, will block until an instance of target-event occurs. os.pullEvent(target-event) returns the event and any parameters the event may have. If a target-event is specified, the computer will not break for any other events (except termination).
	 * @tupleReturn */
	pullEvent<K extends keyof os.Events>(this: void, filter?: K): [K, ...os.Events[K]]

	/** Advanced version of pullEvent(). Blocks until the computer receives an event, or if target-event is specified, will block until an instance of target-event occurs. os.pullEventRaw(target-event) returns the event and any parameters the event may have. Unlike os.pullEvent(target-event), this function will not raise an error if a 'terminate' event is received.
	 * @tupleReturn */
	pullEventRaw<K extends keyof os.Events>(this: void, filter?: K): [K, ...os.Events[K]]

	/** Adds an event to the event queue with the name event and the given parameters.
	 * @vararg */
	queueEvent<K extends keyof os.Events>(this: void, name: K, ...args: os.Events[K]): void

	/** Returns the amount of time since the in-game computer was started. */
	clock(this: void): number

	/** Queues an event to be triggered after a number of seconds (timeout). The ID of the timer is returned from this function to differentiate multiple timers. Timers are one-shot; once they have fired an event you will need to start another one if you need a recurring timer. */
	startTimer(this: void, timeout: number): os.TimerID

	/** Cancels a running timer, to prevent it throwing an event. */
	cancelTimer(this: void, timerID: os.TimerID): void

	/** Returns the current in-game time. */
	time(this: void): number

	/** Makes the system wait a number of seconds before continuing in the program. os.sleep(time) may also be used as simply "sleep(time)". */
	sleep(this: void, time: number): void

	/** Return the current in-game day (the number of in-game days since the world was created). */
	sleep(this: void): number

	/** Queues an event to be triggered at the specified in-game time. */
	setAlarm(this: void, time: number): os.AlarmID

	/** Cancels a pending alarm, to prevent it throwing an event. */
	cancelAlarm(this: void, alarmID: os.AlarmID): number

	/** Turns off the computer. */
	shutdown(this: void): never

	/** Reboots the computer. */
	reboot(this: void): never


	/** Returns an about message with the version, license, and special thanks. */
	about(this: void): string
}

declare namespace paintutils {
	type Image = {readonly '': unique symbol}
}

declare const paintutils: {
	/** Loads and returns an image object from path. */
	loadImage(this: void, path: string): paintutils.Image

	/** Draws an image at (x, y) where image is an image object. */
	drawImage(this: void, image: paintutils.Image, x: number, y: number): void

	/** Draws a pixel at (x, y) in the specified color. */
	drawPixel(this: void, x: number, y: number, color?: number): void

	/** Draws a line from (startX, startY) to (endX, endY) in the specified color. */
	drawLine(this: void, startX: number, startY: number, endX: number, endY: number, color?: number): void

	/** Draws a box from (startX, startY) to (endX, endY) in the specified color. */
	drawBox(this: void, startX: number, startY: number, endX: number, endY: number, color?: number): void

	/** Draws a filled box from (startX, startY) to (endX, endY) in the specified color. */
	drawFilledBox(this: void, startX: number, startY: number, endX: number, endY: number, color?: number): void
}

declare const parallel: {
	/** Runs all the functions at the same time, and stops when any of them returns.
	 * Returns a number indicating which function has completed based on argument order
	 * @vararg */
	waitForAny(this: void, ...functions: ((...args: any) => any)[]): number

	/** Runs all the functions at the same time, and stops when all of them have returned.
	 * @vararg */
	waitForAll(this: void, ...functions: ((...args: any) => any)[]): void
}

declare namespace peripheral {
	type Peripherals = {
		drive: {
			/** Checks whether any item is in a disk drive. */
			isPresent(this: void): boolean

			/** Checks whether a Floppy Disk is in a disk drive. */
			hasData(this: void): boolean

			/** Gets the directory name where the contents of the floppy disk can be accessed. */
			getMountPath(this: void): string | undefined

			/** Sets the floppy disk's label. */
			setLabel(this: void, label: string): void

			/** Gets the floppy disk's label. */
			getLabel(this: void): string | undefined

			/** Gets the floppy disk's unique ID number. */
			getID(this: void): disk.DiskID | undefined

			/** Checks whether a music disk is in the drive. */
			hasAudio(this: void): boolean

			/** Gets the title of the music disc in the drive. */
			getAudioTitle(this: void): string | undefined

			/** Starts playing the music disc in the drive. */
			playAudio(this: void): void

			/** Stops playing the music disc in the drive. */
			playAudio(this: void): void

			/** Ejects any item currently in the drive, spilling it into the world as a loose item. */
			eject(this: void): void
		},
		modem: {
			/** Checks to see if channel is open. */
			isOpen(this: void, channel: number): boolean

			/** Opens channel to allow for listening. The channel specified must be larger than 0 and less than 65535. */
			open(this: void, channel: number): void

			/** Closes an open channel to disallow listening. */
			close(this: void, channel: number): void

			/** Closes all open channels. */
			closeAll(this: void): void

			/** Transmits a message on the specified channel. */
			transmit(this: void, channel: number, replyChannel: number, message: any): void

			/** Returns if the modem is wireless or wired. */
			isWireless(this: void): boolean

			/** Returns a table containing the network names of the peripherals connected to the modem. */
			getNamesRemote(this: void): string[]

			/** Returns the type of a given peripheral connected to the modem. */
			getTypeRemote(this: void, name: string): keyof Peripherals

			/** Returns whether a given peripheral is actively connected to the modem. */
			isPresentRemote(this: void, name: string): boolean

			/** Returns a list strings naming the functions available to the specified peripheral. */
			getMethodsRemote(this: void, name: string): string[]

			/** Has the remote peripheral execute its specified function.
			 * @vararg @tupleReturn */
			callRemote<P extends keyof Peripherals, N extends keyof Peripherals[P]>(
				this: void,
				name: peripheral.Name,
				method: N,
				...args: any[]
			): any[]
		},
		printer: {
			/** Starts a new page. Returns true if page got started, false if not. */
			newPage(this: void): boolean

			/** Ends the page and prints the page to the output tray. Returns true if page was ended, false if not. */
			endPage(this: void): boolean

			/** Writes text to the paper, works the same way as term.write(). */
			write(this: void, arg: any): void

			/** Sets the cursor position on the paper, works the same way as term.setCursorPos(). */
			setCursorPos(this: void, x: number, y: number): void

			/** Returns the coordinates of the cursor on the paper, works the same way as term.getCursorPos().
			 * @tupleReturn */
			getCursorPos(this: void,): [number, number]

			/** Returns the size of the paper, works the same way as term.getSize().
			 * @tupleReturn */
			getPageSize(this: void,): [number, number]

			/** Sets the title of the page. */
			setPageTitle(this: void, title: string): void

			/** Returns the amount of paper available in the paper tray. */
			getPaperLevel(this: void): number

			/** Returns the amount of ink in the ink slot. */
			getInkLevel(this: void): number
		},
		speaker: {
			/** Plays a sound through the speaker. */
			playSound(this: void, name: string, volume?: number, pitch?: number): void

			/** Plays a note block note through the speaker. */
			playSound(this: void, name: string, volume?: number, pitch?: number): void
		}
		command: {
			/** Get the command this command block will run. */
			getCommand(this: void): string

			/** Set the command block's command. */
			setCommand(this: void, command: string): void

			/** Execute the command block once.
			 * @tupleReturn */
			runCommand(this: void,): [true, undefined] | [false, string]
		}
		computer: {
			/** Turns on the Computer or Turtle. */
			turnOn(this: void): void

			/** Shuts off the Computer or Turtle. */
			shutdown(this: void): void

			/** Reboots the Computer or Turtle. */
			reboot(this: void): void

			/** Returns the ID of the Computer or Turtle. */
			getID(this: void): number

			/** Returns the ON/OFF state of the Computer or Turtle. */
			isOn(this: void): boolean
		},
		monitor: Term & {
			/** Sets the text scale. */
			setTextScale(this: void, scale: number): void
		},
		debugger: {
			/** Stops the computer and opens the debugger prompt. */
			stop(this: void): void

			/**
			 * Sets a breakpoint in a file at a line number.
			 * @param file The full file path to the script to stop on
			 * @param line The line number to set the breakpoint at
			 * @returns The ID of the new breakpoint
			 */
			setBreakpoint(this: void, file: string, line: number): number

			/** Prints a value on the debugger's console window. */
			print(this: void, value: any): void
		}
	}

	// @formatter:off
	type Name = Side | `${keyof Peripherals}_${number}`
	// @formatter:on
}

declare const peripheral: {
	/** Returns true if a peripheral is connected on side. */
	isPresent(this: void, side: peripheral.Name): boolean

	/** Returns the type of peripheral connected on side, as a string. If no peripheral is connected, returns nil. */
	getType(this: void, side: peripheral.Name): keyof peripheral.Peripherals | undefined

	/** Returns a list of the names of all the methods of the peripheral connected on side. If no peripheral is connected, returns nil. */
	getMethods(this: void, side: peripheral.Name): (keyof peripheral.Peripherals[keyof peripheral.Peripherals])[] | undefined

	/** Calls a method on a peripheral. The arguments (apart from side and method) and the return values depend on the method being called. If no peripheral is connected, returns nil.
	 * @vararg @tupleReturn */
	call<P extends keyof peripheral.Peripherals, N extends keyof peripheral.Peripherals[P]>(
		this: void,
		side: peripheral.Name,
		method: N,
		...args: any[]
	): any[]

	/** Returns a table of functions, allowing you to call peripheral methods as if they were normal Lua functions. If no peripheral is connected, returns nil. */
	wrap(this: void, side: peripheral.Name): peripheral.Peripherals[keyof peripheral.Peripherals] | undefined

	/** Finds an attached peripheral of the given type and if found returns a table of functions, similar to peripheral.wrap, allowing you to call peripheral methods as if they were normal Lua functions. If no peripheral of the given type is connected, it returns nil. */
	find<K extends keyof peripheral.Peripherals>(
		this: void,
		type: K,
		filter?: (side: peripheral.Name, peripheral: peripheral.Peripherals[K]) => boolean
	): peripheral.Peripherals[K] | undefined

	/** This function returns a table of all the sides that have a peripheral present. If the present peripheral is a wired modem any names of the peripherals that is on the network are also added to the table. */
	getNames(this: void): peripheral.Name[]
}

declare const rednet: {
	/** Tells the computer that the side can be used for networking. */
	open(this: void, side: string): void

	/** Tells the computer that the side can no longer be used for networking. */
	close(this: void, side: string): void

	/** Sends a message "intended" for another system with a specific ID, using the currently opened sides. The receiverID is the ID number (note - not a string) of the computer you're sending the message to. The types that can be sent as the message vary depending on the version of ComputerCraft in use. */
	send(this: void, receiverID: number, message: any, protocol?: string): void

	/** Sends the message to all connected and open computers. */
	broadcast(this: void, message: any, protocol: string): void

	/** Waits until a rednet message of the specified protocol has been received, or until timeout seconds have passed.
	 * @tupleReturn */
	receive(this: void, protocolFilter: string, timeout: number): [number, any, string]
	/** Waits until timeout seconds have passed. Will wait that many seconds for a message of any protocol.
	 * @tupleReturn */
	receive(this: void, timeout: number): [number, any, string]
	/** Waits for any message indefinitely.
	 * @tupleReturn */
	receive(this: void,): [number, any, string]

	/** Returns true if the wireless modem is open. */
	isOpen(this: void, side: string): boolean

	/** Registers hostname against protocol for the purposes of rednet.lookup(). */
	host(this: void, protocol: string, hostname: string): void

	/** Unregisters hostname from protocol. */
	unhost(this: void, protocol: string, hostname: string): void

	/** Searches the local network for systems registered with a matching hostname and/or protocol, and returns matching IDs found.
	 * @tupleReturn */
	lookup(this: void, protocol: string, hostname?: string): number[]

	/** Internal use function - runs automatically and does not need to be called directly. Waits for modem_message events to appear within the event queue and generates corresponding rednet_message events for use with this API. Also responds to rednet.lookup() requests. */
	run(this: void): void

	CHANNEL_BROADCAST: number
	CHANNEL_REPEAT: number
}

declare const redstone: {
	/** Returns a table of possible sides. */
	getSides(this: void): Side[]

	/** Returns the current redstone input signal state on side. */
	getInput(this: void, side: Side): number

	/** Sets or resets a redstone signal on side. */
	setOutput(this: void, side: Side, value: boolean): void

	/** Returns the current redstone output signal on side. */
	getOutput(this: void, side: Side): number

	/** Returns the current redstone input signal strength on side. If no input is present, returns 0. If a redstone source (such as a redstone torch or block) is directly adjacent to the computer, returns 15. */
	getAnalogInput(this: void, side: Side): number

	/** Sets or resets a redstone signal on side to strength (where strength is a positive integer). */
	setAnalogOutput(this: void, side: Side, strength: number): void

	/** Returns the current redstone output signal strength on side. */
	getAnalogOutput(this: void, side: Side): number

	/** Returns the state (as a number) of a bundled cable connected to side. */
	getBundledInput(this: void, side: Side): number

	/** Returns the set of wires in a bundled cable which are being activated by the terminal on side. */
	getBundledOutput(this: void, side: Side): number

	/** Sets one or multiple colored signals in a bundled cable attached to side. colors will determine which signals are activated. In order to set multiple signals, add the color values of the colors you want to activate. To turn off all of the colors, use 0. */
	setBundledOutput(this: void, side: Side, colors: number): void

	/** Returns true if color is active in a bundled cable attached to side. Else, returns false. */
	testBundledInput(this: void, side: Side, color: number): boolean
}

declare const rs: typeof redstone

declare const settings: {
	/** Sets the setting name to value. */
	set(this: void, name: string, value: any): void

	/** Returns the setting's name value, or default if the setting does not exist. */
	get(this: void, name: string, def: any): any

	/** Removes the setting name. */
	unset(this: void, name: string): void

	/** Removes all settings. */
	clear(this: void): void

	/** Returns a numerically-indexed table of all the setting's names. */
	getNames(this: void): string[]

	/** Loads settings from a file. */
	load(this: void, path: string): boolean

	/** Saves current settings to a file. */
	save(this: void, path: string): boolean
}

declare namespace shell {
	/**
	 * The "completion function", when actually utilised (generally via a call to shell.complete()), is passed four parameters - the shell table it is to be used with, the number of parameters entered (1, while user is typing the first; then 2, while the user is typing the second, and so on), the content of the current parameter being typed, and a numerically indexed table containing all the previous parameters typed (1 being the command name, 2 being the first parameter, and so on). For example, if the user enters "pastebin p", the function would be passed (shell, 1, "p", {"pastebin"}).
	 * In turn, the function is expected to return a numerically indexed table containing all the possible strings that could be used to complete the current parameter (or an empty table, if none are known). For example, if the user enters "pastebin p", the expected result is {"ut "}.
	 */
	type CompletionFunction = (caller: typeof shell, idx: number, prefix: string, previousParams: string[]) => string[]
}

declare const shell: {
	/** Exits the current shell. */
	exit(this: void): void

	/** Returns the path to the working directory. */
	dir(this: void): string

	/** Sets the working directory. */
	setDir(this: void, path: string): void

	/** Returns the path. */
	path(this: void): string

	/** Sets the path. */
	setPath(this: void, path: string): void

	/** Resolves a local path to an absolute path. */
	resolve(this: void, localPath: string): string

	/** Resolves the absolute path to the program whose name you provided. */
	resolveProgram(this: void, name: string): string

	/** Returns aliases. */
	aliases(this: void): Map<string, string>

	/** Sets an alias for program. */
	setAlias(this: void, alias: string, program: string): void

	/** Clears an alias. */
	clearAlias(this: void, alias: string): void

	/** Returns a table of files in the current directory and in all paths in shell.path. */
	programs(this: void, showHidden?: boolean): string[]

	/** Returns the absolute path to the currently-executing program. */
	getRunningProgram(this: void): string

	/** Runs a command (program).
	 * @vararg */
	run(this: void, command: string, ...args: string[]): boolean

	/** Runs a program in another multishell tab. Requires an advanced system.
	 * @vararg */
	openTab(this: void, command: string, ...args: string[]): multishell.TabID

	/** Switches the multishell tab to tab with the given ID. Requires an advanced system. */
	switchTab(this: void, tabID: multishell.TabID): void

	/** Given a partial command line, returns a list of suffixes that could potentially be used to complete it. */
	complete(this: void, prefix: string): string[]

	/** Given a partial script / directory path, returns a list of suffixes that could potentially be used to complete it, including alias and path matches. */
	completeProgram(this: void, prefix: string): string[]

	/** Registers a function that determines how shell.complete() handles completion behavior for a given script. */
	setCompletionFunction(this: void, path: string, completionFunction: shell.CompletionFunction): void

	/** Returns a pointer to the table containing functions registered by shell.setCompletionFunction() for use with shell.complete(). */
	getCompletionInfo(this: void): shell.CompletionFunction[]
}

declare const string: {
	/**
	 * Returns the internal numerical codes of the characters s[i], s[i+1], ..., s[j]. The default value for i is 1; the default value for j is i.
	 * Note that numerical codes are not necessarily portable across platforms.
	 * @tupleReturn */
	byte(this: void, s: string, i?: number, j?: number): number[]

	/**
	 * Receives zero or more integers. Returns a string with length equal to the number of arguments, in which each character has the internal numerical code equal to its corresponding argument.
	 * Note that numerical codes are not necessarily portable across platforms.
	 * @vararg */
	char(this: void, ...bytes: number[]): string

	/** Returns a string containing a binary representation of the given function, so that a later loadstring on this string returns a copy of the function. function must be a Lua function without upvalues. */
	dump(this: void, f: (...args: any) => any): string

	/**
	 * Looks for the first match of pattern in the string s. If it finds a match, then find returns the indices of s where this occurrence starts and ends; otherwise, it returns nil. A third, optional numerical argument init specifies where to start the search; its default value is 1 and can be negative. A value of true as a fourth, optional argument plain turns off the pattern matching facilities, so the function does a plain "find substring" operation, with no characters in pattern being considered "magic". Note that if plain is given, then init must be given as well.
	 * If the pattern has captures, then in a successful match the captured values are also returned, after the two indices.
	 * @tupleReturn */
	find(this: void, s: string, pattern: string, init: number, plain: boolean): [undefined] | [number, number, ...string[]]

	/**
	 * Returns a formatted version of its variable number of arguments following the description given in its first argument (which must be a string). The format string follows the same rules as the printf family of standard C functions. The only differences are that the options/modifiers *, l, L, n, p, and h are not supported and that there is an extra option, q. The q option formats a string in a form suitable to be safely read back by the Lua interpreter: the string is written between double quotes, and all double quotes, newlines, embedded zeros, and backslashes in the string are correctly escaped when written. For instance, the call
	 * ```
	 * string.format('%q', 'a string with "quotes" and \n new line')
	 * ```
	 * will produce the string:
	 * ```
	 * "a string with \"quotes\" and \
	 * new line"
	 * ```
	 * The options c, d, E, e, f, g, G, i, o, u, X, and x all expect a number as argument, whereas q and s expect a string.
	 * This function does not accept string values containing embedded zeros, except as arguments to the q option.
	 * @vararg */
	format(this: void, s: string, ...args: (number | string)[]): string

	/**
	 * Returns an iterator function that, each time it is called, returns the next captures from pattern over string s. If pattern specifies no captures, then the whole match is produced in each call.
	 * As an example, the following loop
	 * ```
	 * s = "hello world from Lua"
	 * for w in string.gmatch(s, "%a+") do
	 *     print(w)
	 * end
	 * ```
	 * will iterate over all the words from string s, printing one per line. The next example collects all pairs key=value from the given string into a table:
	 * ```
	 * t = {}
	 * s = "from=world, to=Lua"
	 * for k, v in string.gmatch(s, "(%w+)=(%w+)") do
	 *     t[k] = v
	 * end
	 * ```
	 * For this function, a '^' at the start of a pattern does not work as an anchor, as this would prevent the iteration. */
	gmatch(this: void, s: string, pattern: string): Iterator<string[]>

	/**
	 * Returns a copy of s in which all (or the first n, if given) occurrences of the pattern have been replaced by a replacement string specified by repl, which can be a string, a table, or a function. gsub also returns, as its second value, the total number of matches that occurred.
	 * If repl is a string, then its value is used for replacement. The character % works as an escape character: any sequence in repl of the form %n, with n between 1 and 9, stands for the value of the n-th captured substring (see below). The sequence %0 stands for the whole match. The sequence %% stands for a single %.
	 * If repl is a table, then the table is queried for every match, using the first capture as the key; if the pattern specifies no captures, then the whole match is used as the key.
	 * If repl is a function, then this function is called every time a match occurs, with all captured substrings passed as arguments, in order; if the pattern specifies no captures, then the whole match is passed as a sole argument.
	 * If the value returned by the table query or by the function call is a string or a number, then it is used as the replacement string; otherwise, if it is false or nil, then there is no replacement (that is, the original match is kept in the string).
	 * Here are some examples:
	 * ```
	 * x = string.gsub("hello world", "(%w+)", "%1 %1")
	 * --> x="hello hello world world"
	 *
	 * x = string.gsub("hello world", "%w+", "%0 %0", 1)
	 * --> x="hello hello world"
	 *
	 * x = string.gsub("hello world from Lua", "(%w+)%s*(%w+)", "%2 %1")
	 * --> x="world hello Lua from"
	 *
	 * x = string.gsub("home = $HOME, user = $USER", "%$(%w+)", os.getenv)
	 * --> x="home = /home/roberto, user = roberto"
	 *
	 * x = string.gsub("4+5 = $return 4+5$", "%$(.-)%$", function (s)
	 *       return loadstring(s)()
	 *     end)
	 * --> x="4+5 = 9"
	 *
	 * local t = {name="lua", version="5.1"}
	 * x = string.gsub("$name-$version.tar.gz", "%$(%w+)", t)
	 * --> x="lua-5.1.tar.gz"
	 * ``` */
	gsub(
		this: void,
		s: string,
		pattern: string,
		repl: string |
			{[key: string]: string} |
			((this: void, ...matches: string[]) => string),
		n?: number
	): string

	/** Receives a string and returns its length. The empty string "" has length 0. Embedded zeros are counted, so "a\000bc\000" has length 5. */
	len(this: void, s: string): number

	/** Receives a string and returns a copy of this string with all uppercase letters changed to lowercase. All other characters are left unchanged. The definition of what an uppercase letter is depends on the current locale. */
	lower(this: void, s: string): string

	/** Looks for the first match of pattern in the string s. If it finds one, then match returns the captures from the pattern; otherwise it returns nil. If pattern specifies no captures, then the whole match is returned. A third, optional numerical argument init specifies where to start the search; its default value is 1 and can be negative.
	 * @tupleReturn */
	match(this: void, s: string, pattern: string, init: number): [undefined] | string[]

	/** Returns a string that is the concatenation of n copies of the string s. */
	rep(this: void, s: string, n: number): string

	/** Returns a string that is the string s reversed. */
	reverse(this: void, s: string): string

	/** Returns the substring of s that starts at i and continues until j; i and j can be negative. If j is absent, then it is assumed to be equal to -1 (which is the same as the string length). In particular, the call string.sub(s,1,j) returns a prefix of s with length j, and string.sub(s, -i) returns a suffix of s with length i. */
	sub(this: void, s: string, i: number, j?: number): string

	/** Receives a string and returns a copy of this string with all lowercase letters changed to uppercase. All other characters are left unchanged. The definition of what a lowercase letter is depends on the current locale. */
	upper(this: void, s: string): string
}

declare const table: {
	/** Given an array where all elements are strings or numbers, returns table[i]..sep..table[i+1] ··· sep..table[j]. The default value for sep is the empty string, the default for i is 1, and the default for j is the length of the table. If i is greater than j, returns the empty string. */
	concat(this: void, table: any[], sep?: string, i?: number, j?: number): string

	/** table.insert(t,x) inserts x at the end of table t. */
	insert<T>(this: void, table: T[], value: T): void
	/** Inserts element value at position pos in table, shifting up other elements to open space, if necessary. */
	insert<T>(this: void, table: T[], pos: number, value: T): void

	/** Returns the largest positive numerical index of the given table, or zero if the table has no positive numerical indices. (To do its job this function does a linear traversal of the whole table.) */
	maxn(this: void, table: any[]): number

	/** Removes from table the element at position pos, shifting down other elements to close the space, if necessary. Returns the value of the removed element. The default value for pos is n, where n is the length of the table, so that a call table.remove(t) removes the last element of table t. */
	remove(this: void, table: any[], pos?: number): void

	/**
	 * Sorts table elements in a given order, in-place, from table[1] to table[n], where n is the length of the table. If comp is given, then it must be a function that receives two table elements, and returns true when the first is less than the second (so that not comp(a[i+1],a[i]) will be true after the sort). If comp is not given, then the standard Lua operator < is used instead.
	 * The sort algorithm is not stable; that is, elements considered equal by the given order may have their relative positions changed by the sort.
	 */
	sort<T>(this: void, table: T[], comp?: (less: T, more: T) => boolean): void
}

declare const enum GraphicsMode {
	/** text mode */
	Text        = 0,
	/** 16-color graphics mode */
	Graphics16  = 1,
	/** 256-color garphics mode */
	Graphics256 = 2
}

declare interface Term {
	/** Writes text to the screen, using the current text and background colors. */
	write(this: void, arg: any): void

	/** Writes text to the screen using the specified text and background colors. */
	blit(this: void, text: string, fg: string, bg: string): void

	/** Clears the entire screen. */
	clear(this: void): void

	/** Clears the line the cursor is on. */
	clearLine(this: void): void

	/** Returns two arguments containing the x and the y position of the cursor.
	 * @tupleReturn */
	getCursorPos(this: void): [number, number]

	/** Sets the cursor's position. */
	setCursorPos(this: void, x: number, y: number): void

	/** Disables the blinking or turns it on. */
	setCursorBlink(this: void, blink: boolean): void

	/** Returns whether the terminal supports color. */
	isColor(this: void): boolean

	/** Returns two arguments containing the x and the y values stating the size of the screen. (Good for if you're making something to be compatible with both Turtles and Computers.)
	 * @tupleReturn */
	getSize(this: void): [number, number]

	/** Scrolls the terminal n lines. */
	scroll(this: void, n: number): void

	/** Sets the text color of the terminal. Limited functionality without an Advanced Computer / Turtle / Monitor. */
	setTextColor(this: void, color: colors.Color): void

	/** Returns the current text color of the terminal. */
	getTextColor(this: void): colors.Color

	/** Sets the background color of the terminal. Limited functionality without an Advanced Computer / Turtle / Monitor. */
	setBackgroundColor(this: void, color: colors.Color): void

	/** Returns the current background color of the terminal. */
	getBackgroundColor(this: void): colors.Color

	////////////////////////////////////////////////////////////////////////////

	/** Sets whether the terminal is in pixel-graphics mode */
	setGraphicsMode(this: void, mode: boolean | GraphicsMode): void

	/** Returns the current graphics mode setting (false for text mode, number for graphics mode). */
	getGraphicsMode(this: void): false | GraphicsMode

	/** Sets a pixel at a location. */
	setPixel(this: void, x: number, y: number, color: colors.Color): void

	/** Returns the color of a pixel at a location. */
	getPixel(this: void, x: number, y: number): colors.Color

	/** Draws multiple pixels to the screen at once. */
	drawPixels(this: void, startX: number, startY: number, pixels: (colors.Color[] | string)[]): void

	/** Draws multiple pixels to the screen at once. */
	drawPixels(this: void, startX: number, startY: number, pixels: (colors.Color[] | string)[], width: number, height: number): void

	/** Draws multiple pixels to the screen at once. */
	drawPixels(this: void, startX: number, startY: number, fill: colors.Color, width: number, height: number): void

	/** Returns the colors of every pixel in a region. Off-screen pixels will be `nil`. Only available in CraftOS-PC version 2.5 and later */
	getPixels(this: void, x: number, y: number, w: number, h: number): colors.Color[][]

	/** Sets whether pixel functions should draw to an off-screen buffer. Only available in CraftOS-PC version 2.5 and later */
	bufferPixels(this: void, buffer: boolean): void

	/** Sets the RGB values for a color. (Override) */
	setPaletteColor(this: void, color: colors.Color, hex: number): void

	/** Sets the RGB values for a color. (Override) */
	setPaletteColor(this: void, color: colors.Color, r: number, g: number, b: number): void

	/** Returns the RGB values for a color. (Override)
	 * @tupleReturn */
	getPaletteColor(this: void, color: colors.Color): [number, number, number]

	/** Takes a screenshot. This function is rate-limited to prevent spam. */
	screenshot(this: void): void

	/** Toggles whether to show the mouse cursor over the window. */
	showMouse(this: void, mouse: boolean): void

	// CC:TWEAKED //////////////////////////////////////////////////////////////

	/** Checks if the cursor is currently blinking. */
	getCursorBlink(this: void): boolean
}

declare const term: Term & {
	/** Redirects terminal output to another terminal object (such as a window or wrapped monitor). Available only to the base term object. */
	redirect(this: void, target: Term): typeof term

	/** Returns the current terminal object. Available only to the base term object. */
	current(this: void): Term

	/** Returns the original terminal object. Available only to the base term object. */
	native(this: void): typeof term

	// CC:TWEAKED //////////////////////////////////////////////////////////////

	/** Returns parts of the native color palette
	 * @tupleReturn */
	nativePaletteColor(this: void, color: colors.Color): [number, number, number]
}

declare const textutils: {
	/** Writes string text at current cursor position, character-by-character. Number argument rate is optional and is defaulted to 20. The higher the value of rate, the faster text is written (passing a value of 1 writes one character per second). */
	slowWrite(this: void, text: string, rate: number): void

	/** Prints string text at current cursor position, character-by-character. Number argument rate is optional and is defaulted to 20. The higher the value of rate, the faster text is printed (passing a value of 1 prints one character per second). This function also prints a newline. */
	slowPrint(this: void, text: string, rate: number): void

	/** Takes input time and formats it in a more readable format. If the second value is true, returns time in twenty-four hour format; if the second value is false, returns time in twelve-hour format, with AM or PM. Default for twentyFourHour is false. */
	formatTime(this: void, time: boolean, twentyFourHour: boolean): string

	/** Prints tables in an ordered form. Each table is a row, the column width is auto-adjusted. If it encounters a number instead of a table then sets the text color to it. */
	tabulate(this: void, ...things: (colors.Color | string[])[]): void

	/** Prints tables in an ordered form, like textutils.tabulate. However, it waits for confirmation before scrolling down. */
	pagedTabulate(this: void, ...things: (colors.Color | string[])[]): void

	/** Prints string text onto the screen, but waits for confirmation (after at least freeLines have been scrolled) before scrolling down further. Default for freeLines is 0. */
	pagedPrint(this: void, text: any, freeLines: number): number

	/** Returns a string representation of the data data for storage or transmission. */
	serialize(this: void, data: any): string

	/** Returns the data reassembled from string serializedData. Used mainly together with textutils.serialize(). */
	unserialize(this: void, serializedData: string): any

	/** Returns a JSON representation of the data data in a form of a string, mainly for command usage. Also exists as textutils.serialiseJSON. */
	serializeJSON(this: void, data: any, unquoteKeys: boolean): string

	/** Makes a string safe to encode into a url. Spaces are replaced with +s. Unsafe characters such as '\', '£' and '}' are translated into ASCII code and preceded with a % for transmission. For reference visit: [1]. */
	urlEncode(this: void, urlUnsafeString: string): string

	/** Returns a list of strings that could be combined with the provided name to produce valid entries in the specified environment. */
	complete(this: void, prefix: string, environment: Map<string, any>): string[]
}

/** @customConstructor vector.new */
declare class Vector {
	public x: number
	public y: number
	public z: number

	/** Creates a vector. */
	constructor(x: number, y: number, z: number);

	/** Adds vectorB to vectorA and returns the resulting vector. Can also be used by writing vectorA + vectorB. */
	add(vectorB: Vector): Vector

	/** Subtracts vectorB from vectorA and returns the resulting vector. Can also be used by writing vectorA - vectorB. */
	sub(vectorB: Vector): Vector

	/** Scalar multiplies vectorA with n and returns the resulting vector. Can also be used by writing vectorA * n. */
	mul(n: number): Vector

	/** Returns the dot product of vectorA and vectorB. */
	dot(vectorB: Vector): Vector

	/** Returns the vector which resulted in the cross product of vectorA and vectorB. */
	cross(vectorB: Vector): Vector

	/** Returns the vector's length. */
	length(): number

	/** Normalizes the vector and returns the result as a new vector. */
	normalize(): Vector

	/** Rounds the vector coordinates to the nearest integers and returns the result as a new vector. */
	round(): Vector

	/** Returns a string representation of the vector in the form of "x,y,z". */
	tostring(): string

	// CC:TWEAKED //////////////////////////////////////////////////////////////

	/** Negate a vector */
	unm(): Vector
}

declare interface Window extends Term {
	/** Determines whether subsequent renders to the window will be visible. */
	setVisible(this: void, visibility: boolean): void

	/** Redraws the contents of the window. */
	redraw(this: void): void

	/** Returns the cursor back to its position / state within the window. */
	restoreCursor(this: void): void

	/** Returns the top left co-ordinate of the window. */
	getPosition(this: void): [number, number]

	/** Moves and resizes the window. */
	reposition(this: void, x: number, y: number, w: number, h: number): void

	/** Moves the window. */
	reposition(this: void, x: number, y: number): void
}

declare const window: {
	/** Creates and returns a new window object, similar to a wrapped monitor. Refer to the term API for a list of functions attached to it. */
	create(this: void, parent: Term, x: number, y: number, w: number, h: number, visible?: boolean): Window
}

declare const enum ConfigType {
	Boolean = 0,
	String  = 1,
	Number  = 2,
	Table   = 3
}

declare const config: {
	/** Returns the value of a configuration variable. */
	get(this: void, name: string): any

	/** Sets the value of a configuration variable. */
	set(this: void, name: string, value: any): void

	/** Returns a list of all configuration variable names. */
	list(this: void): string[]

	/** Returns the type of a variable. 0 for boolean, 1 for string, 2 for number, 3 for table */
	getType(this: void, name: string): ConfigType
}

declare const mounter: {
	/** Mounts a real directory to a ComputerCraft directory. Returns whether the mount operation succeeded. */
	mount(this: void, externalPath: string, localPath: string, readOnly?: boolean): boolean

	/** Unmounts a previously mounted local directory. */
	unmount(this: void, localPath: string): boolean

	/** Returns a key-value table of all current mounts on the system. Each value is a list of directories in a multi-mount (if not using multi-mounts, then only one value is in that list). */
	list(this: void): string[]

	/** Returns whether a mount was mounted read-only. */
	isReadOnly(this: void, localPath: string): boolean
}

declare const periphemu: {
	/** Creates a new printer that prints to the specified path. */
	create(this: void, side: peripheral.Name, type: 'printer', path: string): boolean
	/** Creates a new peripheral. */
	create(this: void, side: peripheral.Name, type: keyof peripheral.Peripherals): boolean

	/** Removes a peripheral. */
	remove(this: void, side: peripheral.Name): boolean

	/** Returns a list of available peripheral types. */
	names(this: void): string[]
}
