/**
 * タスクの型
 * id: タスクのid
 * title: タスク名
 * is_done: タスクの完了未完了
 *
 * @export
 * @interface TodoType
 */

export interface TodoType {
  id: number
  title: string
  is_done: boolean
}

// ？はオプションパラメーター
// プロパティ「id」が存在しなくてもエラーにならない,その引数が省略可能