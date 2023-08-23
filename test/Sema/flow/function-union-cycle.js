/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RUN: %shermes --typed --dump-sema -fno-std-globals %s | %FileCheckOrRegen %s --match-full-lines

type A = (a:number) => B;
type B = (a:string) => C;
type C = (a:boolean) => A;

type A1 = (a:number) => B1;
type B1 = (a:string) => C1;
type C1 = (a:boolean) => B1;

// These two types shouldn't be equal and the union should keep 2 arms.
type U = A | A1;

let u: U;

// Auto-generated content below. Please do not modify manually.

// CHECK:function %t.1 = function (a: number): function %t.2
// CHECK-NEXT:function %t.2 = function (a: string): function %t.3
// CHECK-NEXT:function %t.3 = function (a: boolean): function %t.1
// CHECK-NEXT:function %t.4 = function (a: number): function %t.5
// CHECK-NEXT:function %t.5 = function (a: string): function %t.6
// CHECK-NEXT:function %t.6 = function (a: boolean): function %t.5
// CHECK-NEXT:union %t.7 = union function %t.1 | function %t.4

// CHECK:SemContext
// CHECK-NEXT:Func strict
// CHECK-NEXT:    Scope %s.1
// CHECK-NEXT:        Decl %d.1 'u' Let : union %t.7

// CHECK:Program Scope %s.1
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'A'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                NumberTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'B'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'B'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                StringTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'C'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'C'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                BooleanTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'A'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'A1'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                NumberTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'B1'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'B1'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                StringTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'C1'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'C1'
// CHECK-NEXT:        FunctionTypeAnnotation
// CHECK-NEXT:            FunctionTypeParam
// CHECK-NEXT:                Id 'a'
// CHECK-NEXT:                BooleanTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'B1'
// CHECK-NEXT:    TypeAlias
// CHECK-NEXT:        Id 'U'
// CHECK-NEXT:        UnionTypeAnnotation
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'A'
// CHECK-NEXT:            GenericTypeAnnotation
// CHECK-NEXT:                Id 'A1'
// CHECK-NEXT:    VariableDeclaration
// CHECK-NEXT:        VariableDeclarator
// CHECK-NEXT:            Id 'u' [D:E:%d.1 'u']