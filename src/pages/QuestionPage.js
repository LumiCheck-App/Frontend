import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SliderQuestions from "../components/SliderQuestions";
import { FontAwesome } from "@expo/vector-icons";

export default function QuestionPage() {
    const navigation = useNavigation();
    const [questions, setQuestions] = useState([
        {
            id: 0,
            text: "Com que frequência ficas online mais tempo do que pretendias?",
            score: 0,
            answered: false,
        }]);
    const [SlideCardsNumber, setSlideCardnumb] = useState(questions.length - 1);

    const progress = 50 / questions.length;

    function handleAnswers() {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];

            updatedQuestions[SlideCardsNumber].answered = true;

            return updatedQuestions;
        });

        //send to DB

        setSlideCardnumb((prevSlideCardsNumber) => prevSlideCardsNumber - 1);

        if (onButtonClick) {
            onButtonClick(progress, SlideCardsNumber, "FirstFiveQuestions");
        }
    }

    function updateScore(questionId, score) {
        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];

            updatedQuestions[questionId].score = score;

            return updatedQuestions;
        });
    }

    //go to homepage
    function GoToHomePage() {
        navigation.goBack();
    }


    return (
        <View className="flex-1 bg-off-white">
            {/* Header Section */}
            <View className="flex-row h-1/6 w-screen items-center justify-between px-6">
                <TouchableOpacity className="w-1/6" onPress={GoToHomePage}>
                    <FontAwesome name="arrow-left" size={20} color="#686868" />
                </TouchableOpacity>
            </View>
            <View className="h-5/6 w-screen px-6 items-center">
                <Text className="text-2xl font-quickbold text-dark-gray">
                    Respondendo sobre o teu uso da internet,
                    seleciona um número onde 1 é Raramente e 5 Sempre
                </Text>
                <View className="w-screen h-3/5 px-6 items-center justify-center">
                    <View className="relative w-full h-72">
                        {questions.map((question, index) => {
                            return (
                                <SliderQuestions
                                    key={`slider_${index}`}
                                    question={question.text}
                                    pos={question.id}
                                    isAnswered={question.answered}
                                    updateScore={updateScore}
                                />
                            );
                        })}
                    </View>
                </View>
                <View className="w-screen h-1/5 px-6">
                    <TouchableOpacity
                        className="bg-yellow rounded-lg w-full py-3 items-center"
                        onPress={GoToHomePage}
                    >
                        <Text className="text-xl text-white font-quickbold">Concluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
