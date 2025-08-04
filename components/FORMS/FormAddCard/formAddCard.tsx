// import React, { useState, useMemo, useCallback } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Alert, KeyboardAvoidingView, Platform } from "react-native";
// import { Button } from "@/components/UI/Button/button";
// import { VirtualCard } from "@/components/UI/VirtualCard/virtualCard";
// import { formAddCardSchema } from "./formAddCard.schema";
// import type { FormAddCardProps } from "./formAddCard.types";
// import * as S from "./formAddCard.styles";

// export const FormAddCard: React.FC<FormAddCardProps> = ({
//     onSubmit,
//     onCancel,
//     loading = false,
// }) => {
//     const [triggerSend, setTriggerSend] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const {
//         control,
//         handleSubmit,
//         formState: { errors, isValid },
//         watch,
//     } = useForm({
//         resolver: zodResolver(formAddCardSchema),
//         mode: "onChange",
//         defaultValues: {
//             numeroCartao: "",
//             nomeTitular: "",
//             vencimento: "",
//             codigoSeguranca: "",
//         },
//     });

//     const watchedFields = watch();
//     const memoizedCardData = useMemo(
//         () => ({
//             numeroCartao: watchedFields.numeroCartao || "",
//             nomeTitular: watchedFields.nomeTitular || "",
//             vencimento: watchedFields.vencimento || "",
//             codigoSeguranca: watchedFields.codigoSeguranca || "",
//         }),
//         [
//             watchedFields.numeroCartao,
//             watchedFields.nomeTitular,
//             watchedFields.vencimento,
//             watchedFields.codigoSeguranca,
//         ]
//     );

//     const allFieldsFilled = useMemo(
//         () =>
//             Object.values(memoizedCardData).every(
//                 (value) => value.trim() !== ""
//             ),
//         [memoizedCardData]
//     );

//     const isFormValid = isValid && allFieldsFilled;

//     const formatCardNumber = (value: string) => {
//         const numbers = value.replace(/\D/g, "");
//         const formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
//         return formatted.slice(0, 19);
//     };

//     const formatExpiry = (value: string) => {
//         const numbers = value.replace(/\D/g, "");
//         if (numbers.length >= 2) {
//             return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
//         }
//         return numbers;
//     };

//     const handleFormSubmit = useCallback(
//         (data: any) => {
//             console.log("🔘 Button clicked:", {
//                 isFormValid,
//                 isSubmitting,
//                 triggerSend,
//             });

//             if (!isFormValid || isSubmitting) {
//                 console.log("❌ Form invalid or already submitting");
//                 return;
//             }

//             console.log("✅ Starting form submission...");
//             setIsSubmitting(true);
//             setTriggerSend(true);
//         },
//         [isFormValid, isSubmitting]
//     );

//     const handleAnimationComplete = useCallback(() => {
//         console.log("🎬 Animation complete, calling onSubmit...");

//         try {
//             onSubmit(memoizedCardData);
//         } catch (error) {
//             console.error("❌ Error in onSubmit:", error);
//             Alert.alert("Erro", "Erro ao salvar cartão. Tente novamente.");
//         } finally {
//             // Reset states após delay
//             setTimeout(() => {
//                 console.log("🔄 Resetting form states...");
//                 setTriggerSend(false);
//                 setIsSubmitting(false);
//             }, 100);
//         }
//     }, [memoizedCardData, onSubmit]);

//     return (
//         <KeyboardAvoidingView
//             style={{ flex: 1 }}
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//             <S.Container showsVerticalScrollIndicator={false}>
//                 <S.Content>
//                     <S.Header>
//                         <S.BackButton onPress={onCancel}>
//                             <S.BackIcon>←</S.BackIcon>
//                             <S.HeaderTitle>cadastro</S.HeaderTitle>
//                         </S.BackButton>
//                     </S.Header>

//                     <S.VirtualCardContainer>
//                         <VirtualCard
//                             numeroCartao={memoizedCardData.numeroCartao}
//                             nomeTitular={memoizedCardData.nomeTitular}
//                             vencimento={memoizedCardData.vencimento}
//                             isValid={isFormValid}
//                             triggerSend={triggerSend}
//                             onSendAnimation={handleAnimationComplete}
//                         />
//                     </S.VirtualCardContainer>

//                     <S.FormContainer>
//                         {/* Número do cartão */}
//                         <S.InputContainer>
//                             <S.Label>número do cartão</S.Label>
//                             <Controller
//                                 control={control}
//                                 name='numeroCartao'
//                                 render={({
//                                     field: { onChange, value, onBlur },
//                                 }) => {
//                                     const InputComponent = errors.numeroCartao
//                                         ? S.InputErrorWithIcon
//                                         : S.Input;

//                                     return (
//                                         <S.InputWrapper>
//                                             <InputComponent
//                                                 placeholder='1234 5678 9012 3456'
//                                                 value={value}
//                                                 onChangeText={(
//                                                     text: string
//                                                 ) => {
//                                                     const formatted =
//                                                         formatCardNumber(text);
//                                                     onChange(formatted);
//                                                 }}
//                                                 onBlur={onBlur}
//                                                 keyboardType='numeric'
//                                                 returnKeyType='next'
//                                                 maxLength={19}
//                                                 autoCorrect={false}
//                                                 autoCapitalize='none'
//                                                 editable={!isSubmitting}
//                                             />
//                                             <S.CardIcon>
//                                                 <S.CardIconText>
//                                                     💳
//                                                 </S.CardIconText>
//                                             </S.CardIcon>
//                                         </S.InputWrapper>
//                                     );
//                                 }}
//                             />
//                             <S.ErrorText>
//                                 {errors.numeroCartao?.message || ""}
//                             </S.ErrorText>
//                         </S.InputContainer>

//                         {/* Nome do titular */}
//                         <S.InputContainer>
//                             <S.Label>nome do titular do cartão</S.Label>
//                             <Controller
//                                 control={control}
//                                 name='nomeTitular'
//                                 render={({
//                                     field: { onChange, value, onBlur },
//                                 }) => {
//                                     const InputComponent = errors.nomeTitular
//                                         ? S.InputError
//                                         : S.InputNormal;

//                                     return (
//                                         <InputComponent
//                                             placeholder='João Silva Pereira'
//                                             value={value}
//                                             onChangeText={(text: string) =>
//                                                 onChange(text)
//                                             }
//                                             onBlur={onBlur}
//                                             keyboardType='default'
//                                             returnKeyType='next'
//                                             autoCorrect={true}
//                                             autoCapitalize='words'
//                                             editable={!isSubmitting}
//                                         />
//                                     );
//                                 }}
//                             />
//                             <S.ErrorText>
//                                 {errors.nomeTitular?.message || ""}
//                             </S.ErrorText>
//                         </S.InputContainer>

//                         {/* Vencimento e Código */}
//                         <S.RowContainer>
//                             <S.HalfInput>
//                                 <S.Label>vencimento</S.Label>
//                                 <Controller
//                                     control={control}
//                                     name='vencimento'
//                                     render={({
//                                         field: { onChange, value, onBlur },
//                                     }) => {
//                                         const InputComponent = errors.vencimento
//                                             ? S.InputError
//                                             : S.InputNormal;

//                                         return (
//                                             <InputComponent
//                                                 placeholder='00/00'
//                                                 value={value}
//                                                 onChangeText={(
//                                                     text: string
//                                                 ) => {
//                                                     const formatted =
//                                                         formatExpiry(text);
//                                                     onChange(formatted);
//                                                 }}
//                                                 onBlur={onBlur}
//                                                 keyboardType='numeric'
//                                                 returnKeyType='next'
//                                                 maxLength={5}
//                                                 autoCorrect={false}
//                                                 autoCapitalize='none'
//                                                 editable={!isSubmitting}
//                                             />
//                                         );
//                                     }}
//                                 />
//                                 <S.ErrorText>
//                                     {errors.vencimento?.message || ""}
//                                 </S.ErrorText>
//                             </S.HalfInput>

//                             <S.HalfInput>
//                                 <S.Label>código de segurança</S.Label>
//                                 <Controller
//                                     control={control}
//                                     name='codigoSeguranca'
//                                     render={({
//                                         field: { onChange, value, onBlur },
//                                     }) => {
//                                         const InputComponent =
//                                             errors.codigoSeguranca
//                                                 ? S.InputError
//                                                 : S.InputNormal;

//                                         return (
//                                             <InputComponent
//                                                 placeholder='•••'
//                                                 value={value}
//                                                 onChangeText={(text: string) =>
//                                                     onChange(text)
//                                                 }
//                                                 onBlur={onBlur}
//                                                 keyboardType='numeric'
//                                                 returnKeyType='done'
//                                                 maxLength={4}
//                                                 secureTextEntry
//                                                 autoCorrect={false}
//                                                 autoCapitalize='none'
//                                                 editable={!isSubmitting}
//                                             />
//                                         );
//                                     }}
//                                 />
//                                 <S.ErrorText>
//                                     {errors.codigoSeguranca?.message || ""}
//                                 </S.ErrorText>
//                             </S.HalfInput>
//                         </S.RowContainer>

//                         <S.ButtonContainer>
//                             <Button
//                                 title={
//                                     isSubmitting
//                                         ? "Enviando..."
//                                         : loading
//                                         ? "Salvando..."
//                                         : "ADICIONAR"
//                                 }
//                                 variant={
//                                     isFormValid && !isSubmitting
//                                         ? "primary"
//                                         : "secondary"
//                                 }
//                                 onPress={handleSubmit(handleFormSubmit)}
//                             />
//                         </S.ButtonContainer>
//                     </S.FormContainer>
//                 </S.Content>
//             </S.Container>
//         </KeyboardAvoidingView>
//     );
// };

// ===== COMPONENTS/FORMS/FORMADDCARD/FORMADDCARD.TSX (SIMPLES) =====
import React, { useState, useRef } from "react";
import { Alert, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Button } from "@/components/UI/Button/button";
import { VirtualCard } from "@/components/UI/VirtualCard/virtualCard";
import type { FormAddCardProps } from "./formAddCard.types";
import * as S from "./formAddCard.styles";

export const FormAddCard: React.FC<FormAddCardProps> = ({
    onSubmit,
    onCancel,
    loading = false,
}) => {
    // Estados simples - SEM react-hook-form
    const [numeroCartao, setNumeroCartao] = useState("");
    const [nomeTitular, setNomeTitular] = useState("");
    const [vencimento, setVencimento] = useState("");
    const [codigoSeguranca, setCodigoSeguranca] = useState("");

    const [errors, setErrors] = useState<any>({});
    const [triggerSend, setTriggerSend] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs para navegação entre campos
    const nomeTitularRef = useRef<TextInput>(null);
    const vencimentoRef = useRef<TextInput>(null);
    const codigoRef = useRef<TextInput>(null);

    // Máscara para número do cartão
    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        const formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
        return formatted.slice(0, 19);
    };

    // Máscara para vencimento
    const formatExpiry = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length >= 2) {
            return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
        }
        return numbers;
    };

    // Validação simples
    const validateForm = () => {
        const newErrors: any = {};

        if (!numeroCartao.trim()) {
            newErrors.numeroCartao = "Número do cartão é obrigatório";
        } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(numeroCartao)) {
            newErrors.numeroCartao = "Formato: 1234 5678 9012 3456";
        }

        if (!nomeTitular.trim()) {
            newErrors.nomeTitular = "Nome do titular é obrigatório";
        }

        if (!vencimento.trim()) {
            newErrors.vencimento = "Vencimento é obrigatório";
        } else if (!/^\d{2}\/\d{2}$/.test(vencimento)) {
            newErrors.vencimento = "Formato: MM/AA";
        }

        if (!codigoSeguranca.trim()) {
            newErrors.codigoSeguranca = "Código de segurança é obrigatório";
        } else if (codigoSeguranca.length < 3) {
            newErrors.codigoSeguranca = "Código deve ter pelo menos 3 dígitos";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isFormValid =
        numeroCartao.trim() !== "" &&
        nomeTitular.trim() !== "" &&
        vencimento.trim() !== "" &&
        codigoSeguranca.trim() !== "" &&
        Object.keys(errors).length === 0;

    const handleSubmit = () => {
        console.log("🔘 Button clicked");

        if (!validateForm() || isSubmitting) {
            console.log("❌ Form invalid or already submitting");
            return;
        }

        console.log("✅ Starting form submission...");
        setIsSubmitting(true);
        setTriggerSend(true);
    };

    const handleAnimationComplete = () => {
        console.log("🎬 Animation complete");

        try {
            const data = {
                numeroCartao,
                nomeTitular,
                vencimento,
                codigoSeguranca,
            };
            onSubmit(data);
        } catch (error) {
            console.error("❌ Error in onSubmit:", error);
            Alert.alert("Erro", "Erro ao salvar cartão. Tente novamente.");
        } finally {
            setTimeout(() => {
                setTriggerSend(false);
                setIsSubmitting(false);
            }, 100);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <S.Container
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
            >
                <S.Content>
                    <S.Header>
                        <S.BackButton onPress={onCancel}>
                            <S.BackIcon>←</S.BackIcon>
                            <S.HeaderTitle>cadastro</S.HeaderTitle>
                        </S.BackButton>
                        <S.HeaderSubtitle>Wallet Test</S.HeaderSubtitle>
                    </S.Header>

                    <S.VirtualCardContainer>
                        <VirtualCard
                            numeroCartao={numeroCartao}
                            nomeTitular={nomeTitular}
                            vencimento={vencimento}
                            isValid={isFormValid}
                            triggerSend={triggerSend}
                            onSendAnimation={handleAnimationComplete}
                        />
                    </S.VirtualCardContainer>

                    <S.FormContainer>
                        {/* Número do cartão */}
                        <S.InputContainer>
                            <S.Label>número do cartão</S.Label>
                            <S.InputWrapper>
                                <S.Input
                                    placeholder='1234 5678 9012 3456'
                                    value={numeroCartao}
                                    onChangeText={(text: string) => {
                                        const formatted =
                                            formatCardNumber(text);
                                        setNumeroCartao(formatted);
                                        // Limpar erro quando usuário digita
                                        if (errors.numeroCartao) {
                                            setErrors((prev: any) => ({
                                                ...prev,
                                                numeroCartao: undefined,
                                            }));
                                        }
                                    }}
                                    onSubmitEditing={() =>
                                        nomeTitularRef.current?.focus()
                                    }
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    maxLength={19}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    editable={!isSubmitting}
                                    blurOnSubmit={false}
                                />
                                <S.CardIcon>
                                    <S.CardIconText>💳</S.CardIconText>
                                </S.CardIcon>
                            </S.InputWrapper>
                            <S.ErrorText>
                                {errors.numeroCartao || ""}
                            </S.ErrorText>
                        </S.InputContainer>

                        {/* Nome do titular */}
                        <S.InputContainer>
                            <S.Label>nome do titular do cartão</S.Label>
                            <S.InputNormal
                                ref={nomeTitularRef}
                                placeholder='João Silva Pereira'
                                value={nomeTitular}
                                onChangeText={(text: string) => {
                                    setNomeTitular(text);
                                    if (errors.nomeTitular) {
                                        setErrors((prev: any) => ({
                                            ...prev,
                                            nomeTitular: undefined,
                                        }));
                                    }
                                }}
                                onSubmitEditing={() =>
                                    vencimentoRef.current?.focus()
                                }
                                keyboardType='default'
                                returnKeyType='next'
                                autoCorrect={true}
                                autoCapitalize='words'
                                editable={!isSubmitting}
                                blurOnSubmit={false}
                            />
                            <S.ErrorText>
                                {errors.nomeTitular || ""}
                            </S.ErrorText>
                        </S.InputContainer>

                        {/* Vencimento e Código */}
                        <S.RowContainer>
                            <S.HalfInput>
                                <S.Label>vencimento</S.Label>
                                <S.InputNormal
                                    ref={vencimentoRef}
                                    placeholder='00/00'
                                    value={vencimento}
                                    onChangeText={(text: string) => {
                                        const formatted = formatExpiry(text);
                                        setVencimento(formatted);
                                        if (errors.vencimento) {
                                            setErrors((prev: any) => ({
                                                ...prev,
                                                vencimento: undefined,
                                            }));
                                        }
                                    }}
                                    onSubmitEditing={() =>
                                        codigoRef.current?.focus()
                                    }
                                    keyboardType='numeric'
                                    returnKeyType='next'
                                    maxLength={5}
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    editable={!isSubmitting}
                                    blurOnSubmit={false}
                                />
                                <S.ErrorText>
                                    {errors.vencimento || ""}
                                </S.ErrorText>
                            </S.HalfInput>

                            <S.HalfInput>
                                <S.Label>código de segurança</S.Label>
                                <S.InputNormal
                                    ref={codigoRef}
                                    placeholder='•••'
                                    value={codigoSeguranca}
                                    onChangeText={(text: string) => {
                                        setCodigoSeguranca(text);
                                        if (errors.codigoSeguranca) {
                                            setErrors((prev: any) => ({
                                                ...prev,
                                                codigoSeguranca: undefined,
                                            }));
                                        }
                                    }}
                                    keyboardType='numeric'
                                    returnKeyType='done'
                                    maxLength={4}
                                    secureTextEntry
                                    autoCorrect={false}
                                    autoCapitalize='none'
                                    editable={!isSubmitting}
                                    blurOnSubmit={false}
                                />
                                <S.ErrorText>
                                    {errors.codigoSeguranca || ""}
                                </S.ErrorText>
                            </S.HalfInput>
                        </S.RowContainer>

                        <S.ButtonContainer>
                            <Button
                                title={
                                    isSubmitting
                                        ? "Enviando..."
                                        : loading
                                        ? "Salvando..."
                                        : "ADICIONAR"
                                }
                                variant={
                                    isFormValid && !isSubmitting
                                        ? "primary"
                                        : "secondary"
                                }
                                onPress={handleSubmit}
                            />
                        </S.ButtonContainer>
                    </S.FormContainer>
                </S.Content>
            </S.Container>
        </KeyboardAvoidingView>
    );
};
