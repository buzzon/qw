/**
 * Generated by `createschema mumu.Mumu 'name:Text; isWorked?:Checkbox;'`
 */

import { pick, get } from 'lodash'

import { getClientSideSenderInfo } from '@condo/domains/common/utils/userid.utils'
import { generateReactHooks } from '@condo/domains/common/utils/codegeneration/generate.hooks'

import { Mumu as MumuGQL } from '@condo/domains/mumu/gql'
import { Mumu, MumuUpdateInput, QueryAllMumusArgs } from '../../../../schema'

const FIELDS = ['id', 'name', 'isWorked']
const RELATIONS = []

export interface IMumuUIState extends Mumu {
    id: string
    // TODO(codegen): write IMumuUIState or extends it from
}

function convertToUIState (item: Mumu): IMumuUIState {
    if (item.dv !== 1) throw new Error('unsupported item.dv')
    return pick(item, FIELDS) as IMumuUIState
}

export interface IMumuFormState {
    id?: undefined
    // TODO(codegen): write IMumuUIFormState or extends it from
}

function convertToUIFormState (state: IMumuUIState): IMumuFormState | undefined {
    if (!state) return
    const result = {}
    for (const attr of Object.keys(state)) {
        const attrId = get(state[attr], 'id')
        result[attr] = (RELATIONS.includes(attr) && state[attr]) ? attrId || state[attr] : state[attr]
    }
    return result as IMumuFormState
}

function convertToGQLInput (state: IMumuFormState): MumuUpdateInput {
    const sender = getClientSideSenderInfo()
    const result = { dv: 1, sender }
    for (const attr of Object.keys(state)) {
        const attrId = get(state[attr], 'id')
        result[attr] = (RELATIONS.includes(attr) && state[attr]) ? { connect: { id: (attrId || state[attr]) } } : state[attr]
    }
    return result
}

const {
    useObject,
    useObjects,
    useCreate,
    useUpdate,
    useDelete,
    useSoftDelete,
} = generateReactHooks<Mumu, MumuUpdateInput, IMumuFormState, IMumuUIState, QueryAllMumusArgs>(MumuGQL, { convertToGQLInput, convertToUIState })

export {
    useObject,
    useObjects,
    useCreate,
    useUpdate,
    useDelete,
    useSoftDelete,
    convertToUIFormState,
}
