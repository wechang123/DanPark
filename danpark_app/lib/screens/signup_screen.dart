import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:form_builder_validators/form_builder_validators.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../models/user_model.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({Key? key}) : super(key: key);

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormBuilderState>();
  bool _isLoading = false;

  void _handleSignup() async {
    if (_formKey.currentState!.saveAndValidate()) {
      setState(() {
        _isLoading = true;
      });

      final values = _formKey.currentState!.value;
      final authProvider = Provider.of<AuthProvider>(context, listen: false);

      final user = User(
        email: values['email'],
        password: values['password'],
        name: values['name'],
        phoneNumber: values['phoneNumber'],
        carNumber: values['carNumber'],
      );

      final success = await authProvider.signup(user);

      if (!mounted) return;

      setState(() {
        _isLoading = false;
      });

      if (success) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('회원가입 성공! 로그인해주세요.'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.pop(context);
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(authProvider.errorMessage ?? '회원가입 실패'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: const IconThemeData(color: Colors.black),
        title: const Text(
          '회원가입',
          style: TextStyle(color: Colors.black),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 20),

              // Title
              Text(
                '계정 만들기',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                '단주차 서비스를 이용하기 위해 정보를 입력해주세요',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 32),

              // Signup Form
              FormBuilder(
                key: _formKey,
                child: Column(
                  children: [
                    // Email
                    FormBuilderTextField(
                      name: 'email',
                      decoration: InputDecoration(
                        labelText: '이메일 *',
                        prefixIcon: const Icon(Icons.email),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                          errorText: '이메일을 입력해주세요',
                        ),
                        FormBuilderValidators.email(
                          errorText: '유효한 이메일을 입력해주세요',
                        ),
                      ]),
                      keyboardType: TextInputType.emailAddress,
                    ),
                    const SizedBox(height: 16),

                    // Password
                    FormBuilderTextField(
                      name: 'password',
                      decoration: InputDecoration(
                        labelText: '비밀번호 *',
                        prefixIcon: const Icon(Icons.lock),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        helperText: '최소 8자 이상',
                      ),
                      obscureText: true,
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                          errorText: '비밀번호를 입력해주세요',
                        ),
                        FormBuilderValidators.minLength(
                          8,
                          errorText: '비밀번호는 최소 8자 이상이어야 합니다',
                        ),
                      ]),
                    ),
                    const SizedBox(height: 16),

                    // Password Confirmation
                    FormBuilderTextField(
                      name: 'passwordConfirm',
                      decoration: InputDecoration(
                        labelText: '비밀번호 확인 *',
                        prefixIcon: const Icon(Icons.lock_outline),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      obscureText: true,
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return '비밀번호 확인을 입력해주세요';
                        }
                        if (_formKey.currentState?.fields['password']?.value != value) {
                          return '비밀번호가 일치하지 않습니다';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Name
                    FormBuilderTextField(
                      name: 'name',
                      decoration: InputDecoration(
                        labelText: '이름 *',
                        prefixIcon: const Icon(Icons.person),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                          errorText: '이름을 입력해주세요',
                        ),
                        FormBuilderValidators.minLength(
                          2,
                          errorText: '이름은 2자 이상이어야 합니다',
                        ),
                      ]),
                    ),
                    const SizedBox(height: 16),

                    // Phone Number
                    FormBuilderTextField(
                      name: 'phoneNumber',
                      decoration: InputDecoration(
                        labelText: '전화번호 *',
                        prefixIcon: const Icon(Icons.phone),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        helperText: '예: 010-1234-5678',
                      ),
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(
                          errorText: '전화번호를 입력해주세요',
                        ),
                        FormBuilderValidators.match(
                          RegExp(r'^\d{3}-\d{3,4}-\d{4}$'),
                          errorText: '올바른 전화번호 형식이 아닙니다',
                        ),
                      ]),
                      keyboardType: TextInputType.phone,
                    ),
                    const SizedBox(height: 16),

                    // Car Number (Optional)
                    FormBuilderTextField(
                      name: 'carNumber',
                      decoration: InputDecoration(
                        labelText: '차량번호 (선택)',
                        prefixIcon: const Icon(Icons.directions_car),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        helperText: '예: 12가 3456',
                      ),
                    ),
                    const SizedBox(height: 32),

                    // Signup Button
                    SizedBox(
                      width: double.infinity,
                      height: 48,
                      child: ElevatedButton(
                        onPressed: _isLoading ? null : _handleSignup,
                        style: ElevatedButton.styleFrom(
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        child: _isLoading
                            ? const CircularProgressIndicator(
                                color: Colors.white,
                              )
                            : const Text(
                                '회원가입',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Terms and Conditions
              Text(
                '회원가입 시 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.',
                style: Theme.of(context).textTheme.bodySmall,
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}