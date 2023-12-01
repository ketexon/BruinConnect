import { NextResponse } from "next/server"

/**
 * @template T
 * @typedef {{ data: T, error: null} | { data: null, error: string}} ApiResponse
 */

/**
 * @template T
 * @param {string} message
 * @param {Number} status
 * @returns {NextResponse<ApiResponse<T>>}
 */
export function error(message, status = 400){
	return NextResponse.json(
		/** @type {ApiResponse<T>} */
		({
			data: null,
			error: message
		}),
		{ status }
	)
}

/**
 * @template T
 * @param {T} data
 * @param {Number} status
 * @returns {NextResponse<ApiResponse<T>>}
 */
export function ok(data, status = 200){
	return NextResponse.json(
		/** @type {ApiResponse<T>} */
		({
			data,
			error: null
		}),
		{
			status
		}
	)
}