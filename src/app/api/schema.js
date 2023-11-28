import { NextResponse } from "next/server"

/**
 * @template T
 * @typedef {Object} BCAPIResult
 * @property {T | null} data
 * @property {string | null} error
 */

/**
 * @template [T=any]
 * @param {string} message
 * @param {number} statusCode
 * @returns {NextResponse<BCAPIResult<T>>}
 */
export function makeError(error, statusCode = 400) {
	return NextResponse.json({ data: null, error }, { status: statusCode });
}

/**
 * @template [T=any]
 * @param {T} data
 * @param {number} statusCode
 * @returns {NextResponse<BCAPIResult<T>>}
 */
export function makeOk(data, statusCode = 200) {
	return NextResponse.json({ data, error: null }, { status: statusCode });
}